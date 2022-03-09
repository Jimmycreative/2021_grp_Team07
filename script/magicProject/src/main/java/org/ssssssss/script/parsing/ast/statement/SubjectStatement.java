package org.ssssssss.script.parsing.ast.statement;

import org.ssssssss.script.asm.Label;
import org.ssssssss.script.compile.MagicScriptCompiler;
import org.ssssssss.script.parsing.Span;
import org.ssssssss.script.parsing.ast.Node;

import java.util.List;

public class SubjectStatement extends Node {

    private final List<Node> subjectBlock;

    public SubjectStatement(Span span, List<Node> basicBlock) {
        super(span);
        this.subjectBlock = basicBlock;
    }

    @Override
    public void visitMethod(MagicScriptCompiler compiler) {

        subjectBlock.forEach(it -> it.visitMethod(compiler));
    }

    @Override
    public void compile(MagicScriptCompiler compiler) {
        Label start = new Label();
        Label end = new Label();
        compiler.markLabel(start, end)
                .label(start)

                // 执行循环体
                .compile(subjectBlock)
                .label(end)
                .exitLabel();

    }
}

