package org.ssssssss.script.parsing.ast.statement;

import org.ssssssss.script.asm.Label;
import org.ssssssss.script.compile.MagicScriptCompiler;
import org.ssssssss.script.exception.MagicExitException;
import org.ssssssss.script.parsing.Span;
import org.ssssssss.script.parsing.VarIndex;
import org.ssssssss.script.parsing.ast.Node;

import java.util.List;

public class TryStatement extends Node {
	private final VarIndex exceptionVarNode;
	private final List<Node> tryBlock;
	private final List<Node> catchBlock;
	private final List<Node> finallyBlock;

	public TryStatement(Span span, VarIndex exceptionVarNode, List<Node> tryBlock, List<Node> catchBlock, List<Node> finallyBlock) {
		super(span);
		this.exceptionVarNode = exceptionVarNode;
		this.tryBlock = tryBlock;
		this.catchBlock = catchBlock;
		this.finallyBlock = finallyBlock;
	}

	@Override
	public void visitMethod(MagicScriptCompiler compiler) {
		tryBlock.forEach(it -> it.visitMethod(compiler));
		catchBlock.forEach(it -> it.visitMethod(compiler));
		finallyBlock.forEach(it -> it.visitMethod(compiler));
	}

	@Override
	public void compile(MagicScriptCompiler compiler) {
		Label l0 = new Label();
		Label l1 = new Label();
		Label l2 = new Label();
		Label end = new Label();
		boolean hasCatch = exceptionVarNode != null;
		boolean hasFinally = !finallyBlock.isEmpty();
		compiler.tryCatch(l0, l1, l1, MagicExitException.class);
		if (hasCatch) {    // try catch
			compiler.tryCatch(l0, l1, l2, Throwable.class);
		}
		if (hasFinally) { // try + catch + finally
			compiler.putFinallyBlock(finallyBlock);
		}
		compiler.label(l0)
				.compile(tryBlock);    // try
		if (hasFinally && compiler.finallyBlock() == finallyBlock) {
			compiler.compile(compiler.finallyBlock());
		}
		compiler.jump(GOTO, end);    // 跳转至结束
		compiler.label(l1)    // catch MagicExitException
				.insn(ATHROW);    // throw e
		if (hasCatch) {
			compiler.label(l2) // catch Throwable
					.store(3)    // 将异常保存至3号变量
					.pre_store(exceptionVarNode)    //保存异常变量前准备
					.load3()    // 将异常加载出来
					.store(exceptionVarNode)    // 保存至用户定义的变量中
					.compile(catchBlock);    // 编译catch代码块
			if (hasFinally && compiler.finallyBlock() == finallyBlock) {
				compiler.compile(compiler.finallyBlock());    // 编译finally快
			}
			compiler.jump(GOTO, end);    // 跳转至结束
		}
		// 消耗掉多余的finally
		while (compiler.finallyBlock() == finallyBlock) {
			compiler.getFinallyBlock();
		}
		compiler.label(end);
	}
}