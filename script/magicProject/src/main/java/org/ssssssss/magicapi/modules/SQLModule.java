package org.ssssssss.magicapi.modules;

import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.ArgumentPreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlParameterValue;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.ssssssss.magicapi.adapter.ColumnMapperAdapter;
import org.ssssssss.magicapi.adapter.DialectAdapter;
import org.ssssssss.magicapi.cache.SqlCache;
import org.ssssssss.magicapi.config.MagicDynamicDataSource;
import org.ssssssss.magicapi.config.MagicDynamicDataSource.DataSourceNode;
import org.ssssssss.magicapi.config.MagicModule;
import org.ssssssss.magicapi.context.RequestContext;
import org.ssssssss.magicapi.dialect.Dialect;
import org.ssssssss.magicapi.interceptor.NamedTableInterceptor;
import org.ssssssss.magicapi.interceptor.SQLInterceptor;
import org.ssssssss.magicapi.model.Page;
import org.ssssssss.magicapi.model.RequestEntity;
import org.ssssssss.magicapi.modules.table.NamedTable;
import org.ssssssss.magicapi.provider.PageProvider;
import org.ssssssss.magicapi.provider.ResultProvider;
import org.ssssssss.magicapi.script.ScriptManager;
import org.ssssssss.script.annotation.Comment;
import org.ssssssss.script.annotation.UnableCall;
import org.ssssssss.script.parsing.ast.statement.ClassConverter;
import org.ssssssss.script.reflection.JavaReflection;
import org.ssssssss.script.runtime.RuntimeContext;

import java.lang.reflect.Field;
import java.sql.*;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * 数据库查询模块
 *
 * @author mxd
 */
public class SQLModule extends HashMap<String, SQLModule> implements MagicModule {

	static {
		try {
			Field[] fields = Types.class.getFields();
			Map<String, Integer> mappings = Stream.of(fields)
					.collect(Collectors.toMap(field -> field.getName().toLowerCase(), field -> (Integer) JavaReflection.getFieldValue(Types.class, field)));
			ClassConverter.register("sql", (value, params) -> {
				if (params == null || params.length == 0) {
					return value;
				}
				if (params[0] instanceof Number) {
					return new SqlParameterValue(((Number) params[0]).intValue(), value);
				}
				String target = Objects.toString(params[0], null);
				if (StringUtils.isBlank(target)) {
					return value;
				}
				Integer sqlType = mappings.get(target.toLowerCase());
				return sqlType == null ? value : new SqlParameterValue(sqlType, target, value);
			});
		} catch (Exception ignored) {

		}
	}

	private MagicDynamicDataSource dynamicDataSource;
	private DataSourceNode dataSourceNode;
	private PageProvider pageProvider;
	private ResultProvider resultProvider;
	private ColumnMapperAdapter columnMapperAdapter;
	private DialectAdapter dialectAdapter;
	private RowMapper<Map<String, Object>> columnMapRowMapper;
	private Function<String, String> rowMapColumnMapper;
	private SqlCache sqlCache;
	private String cacheName;
	private List<SQLInterceptor> sqlInterceptors;
	private List<NamedTableInterceptor> namedTableInterceptors;
	private long ttl;
	private String logicDeleteColumn;
	private String logicDeleteValue;

	public SQLModule() {

	}

	public SQLModule(MagicDynamicDataSource dynamicDataSource) {
		this.dynamicDataSource = dynamicDataSource;
	}

	@UnableCall
	public void setPageProvider(PageProvider pageProvider) {
		this.pageProvider = pageProvider;
	}

	@UnableCall
	public void setResultProvider(ResultProvider resultProvider) {
		this.resultProvider = resultProvider;
	}

	@UnableCall
	public void setColumnMapperProvider(ColumnMapperAdapter columnMapperAdapter) {
		this.columnMapperAdapter = columnMapperAdapter;
	}

	@UnableCall
	public void setDialectAdapter(DialectAdapter dialectAdapter) {
		this.dialectAdapter = dialectAdapter;
	}

	@UnableCall
	public void setColumnMapRowMapper(RowMapper<Map<String, Object>> columnMapRowMapper) {
		this.columnMapRowMapper = columnMapRowMapper;
	}

	@UnableCall
	public void setRowMapColumnMapper(Function<String, String> rowMapColumnMapper) {
		this.rowMapColumnMapper = rowMapColumnMapper;
	}

	private void setDynamicDataSource(MagicDynamicDataSource dynamicDataSource) {
		this.dynamicDataSource = dynamicDataSource;
	}

	@UnableCall
	public void setSqlInterceptors(List<SQLInterceptor> sqlInterceptors) {
		this.sqlInterceptors = sqlInterceptors;
	}

	@UnableCall
	public void setNamedTableInterceptors(List<NamedTableInterceptor> namedTableInterceptors) {
		this.namedTableInterceptors = namedTableInterceptors;
	}

	@UnableCall
	public void setDataSourceNode(DataSourceNode dataSourceNode) {
		this.dataSourceNode = dataSourceNode;
	}

	protected String getCacheName() {
		return cacheName;
	}

	private void setCacheName(String cacheName) {
		this.cacheName = cacheName;
	}

	protected long getTtl() {
		return ttl;
	}

	private void setTtl(long ttl) {
		this.ttl = ttl;
	}

	@UnableCall
	public String getLogicDeleteColumn() {
		return logicDeleteColumn;
	}

	@UnableCall
	public void setLogicDeleteColumn(String logicDeleteColumn) {
		this.logicDeleteColumn = logicDeleteColumn;
	}

	@UnableCall
	public String getLogicDeleteValue() {
		return logicDeleteValue;
	}

	@UnableCall
	public void setLogicDeleteValue(String logicDeleteValue) {
		this.logicDeleteValue = logicDeleteValue;
	}

	protected SqlCache getSqlCache() {
		return sqlCache;
	}

	@UnableCall
	public void setSqlCache(SqlCache sqlCache) {
		this.sqlCache = sqlCache;
	}

	@UnableCall
	public SQLModule cloneSQLModule() {
		SQLModule sqlModule = new SQLModule();
		sqlModule.setDynamicDataSource(this.dynamicDataSource);
		sqlModule.setDataSourceNode(this.dataSourceNode);
		sqlModule.setPageProvider(this.pageProvider);
		sqlModule.setColumnMapperProvider(this.columnMapperAdapter);
		sqlModule.setColumnMapRowMapper(this.columnMapRowMapper);
		sqlModule.setRowMapColumnMapper(this.rowMapColumnMapper);
		sqlModule.setSqlCache(this.sqlCache);
		sqlModule.setTtl(this.ttl);
		sqlModule.setCacheName(this.cacheName);
		sqlModule.setResultProvider(this.resultProvider);
		sqlModule.setDialectAdapter(this.dialectAdapter);
		sqlModule.setSqlInterceptors(this.sqlInterceptors);
		sqlModule.setLogicDeleteValue(this.logicDeleteValue);
		sqlModule.setLogicDeleteColumn(this.logicDeleteColumn);
		sqlModule.setNamedTableInterceptors(this.namedTableInterceptors);
		return sqlModule;
	}

	/**
	 * 开启事务，在一个回调中进行操作
	 *
	 * @param function 回调函数
	 */
	@Comment("开启事务，并在回调中处理")
	public Object transaction(@Comment(name = "function", value = "回调函数，如：()=>{....}") Function<?, ?> function) {
		// 创建事务
		Transaction transaction = transaction();
		try {
			Object val = function.apply(null);
			transaction.commit();    //提交事务
			return val;
		} catch (Throwable throwable) {
			transaction.rollback();    //回滚事务
			throw throwable;
		}
	}

	/**
	 * 开启事务，手动提交和回滚
	 */
	@Comment("开启事务，返回事务对象")
	public Transaction transaction() {
		return new Transaction(this.dataSourceNode.getDataSourceTransactionManager());
	}

	/**
	 * 使用缓存
	 *
	 * @param cacheName 缓存名
	 * @param ttl       过期时间
	 */
	@Comment("使用缓存")
	public SQLModule cache(@Comment(name = "cacheName", value = "缓存名") String cacheName,
						   @Comment(name = "ttl", value = "过期时间") long ttl) {
		if (cacheName == null) {
			return this;
		}
		SQLModule sqlModule = cloneSQLModule();
		sqlModule.setCacheName(cacheName);
		sqlModule.setTtl(ttl);
		return sqlModule;
	}

	/**
	 * 使用缓存（采用默认缓存时间）
	 *
	 * @param cacheName 缓冲名
	 */
	@Comment("使用缓存，过期时间采用默认配置")
	public SQLModule cache(@Comment(name = "cacheName", value = "缓存名") String cacheName) {
		return cache(cacheName, 0);
	}

	@Comment("采用驼峰列名")
	public SQLModule camel() {
		return columnCase("camel");
	}

	@Comment("采用帕斯卡列名")
	public SQLModule pascal() {
		return columnCase("pascal");
	}

	@Comment("采用全小写列名")
	public SQLModule lower() {
		return columnCase("lower");
	}

	@Comment("采用全大写列名")
	public SQLModule upper() {
		return columnCase("upper");
	}

	@Comment("列名保持原样")
	public SQLModule normal() {
		return columnCase("default");
	}

	@Comment("指定列名转换")
	public SQLModule columnCase(String name) {
		SQLModule sqlModule = cloneSQLModule();
		sqlModule.setColumnMapRowMapper(this.columnMapperAdapter.getColumnMapRowMapper(name));
		sqlModule.setRowMapColumnMapper(this.columnMapperAdapter.getRowMapColumnMapper(name));
		return sqlModule;
	}

	/**
	 * 数据源切换
	 */
	@Override
	public SQLModule get(Object key) {
		SQLModule sqlModule = cloneSQLModule();
		if (key == null) {
			sqlModule.setDataSourceNode(dynamicDataSource.getDataSource());
		} else {
			sqlModule.setDataSourceNode(dynamicDataSource.getDataSource(key.toString()));
		}
		return sqlModule;
	}


	/**
	 * 查询List
	 */
	@Comment("查询SQL，返回List类型结果")
	public List<Map<String, Object>> select(RuntimeContext runtimeContext,
											@Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml) {
		return select(runtimeContext, sqlOrXml, null);
	}

	/**
	 * 查询List，并传入变量信息
	 */
	@Comment("查询SQL，并传入变量信息，返回List类型结果")
	public List<Map<String, Object>> select(RuntimeContext runtimeContext,
											@Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml,
											@Comment(name = "params", value = "变量信息") Map<String, Object> params) {
		return select(new BoundSql(runtimeContext, sqlOrXml, params, this));
	}

	@UnableCall
	public List<Map<String, Object>> select(BoundSql boundSql) {
		assertDatasourceNotNull();
		return boundSql.execute(this.sqlInterceptors, () -> queryForList(boundSql));
	}

	private List<Map<String, Object>> queryForList(BoundSql boundSql) {
		List<Map<String, Object>> list = dataSourceNode.getJdbcTemplate().query(boundSql.getSql(), this.columnMapRowMapper, boundSql.getParameters());
		if (boundSql.getExcludeColumns() != null) {
			list.forEach(row -> boundSql.getExcludeColumns().forEach(row::remove));
		}
		return list;
	}

	private void assertDatasourceNotNull() {
		if (dataSourceNode == null) {
			throw new NullPointerException("当前数据源未设置");
		}
	}

	/**
	 * 执行update
	 */
	@Comment("执行update操作，返回受影响行数")
	public int update(RuntimeContext runtimeContext,
					  @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml) {
		return update(runtimeContext, sqlOrXml, null);
	}

	/**
	 * 执行update，并传入变量信息
	 */
	@Comment("执行update操作，并传入变量信息，返回受影响行数")
	public int update(RuntimeContext runtimeContext,
					  @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml,
					  @Comment(name = "params", value = "变量信息") Map<String, Object> params) {
		return update(new BoundSql(runtimeContext, sqlOrXml, params, this));
	}

	@UnableCall
	public int update(BoundSql boundSql) {
		assertDatasourceNotNull();
		RequestEntity requestEntity = RequestContext.getRequestEntity();
		sqlInterceptors.forEach(sqlInterceptor -> sqlInterceptor.preHandle(boundSql, requestEntity));
		Object value = dataSourceNode.getJdbcTemplate().update(boundSql.getSql(), boundSql.getParameters());
		if (this.cacheName != null) {
			this.sqlCache.delete(this.cacheName);
		}
		for (SQLInterceptor sqlInterceptor : sqlInterceptors) {
			value = sqlInterceptor.postHandle(boundSql, value, requestEntity);
		}
		return (int) value;
	}

	/**
	 * 插入并返回主键
	 */
	@Comment("执行insert操作，返回插入主键")
	public Object insert(RuntimeContext runtimeContext,
						 @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml) {
		return insert(runtimeContext, sqlOrXml, null, null);
	}

	/**
	 * 插入并返回主键，并传入变量信息
	 */
	@Comment("执行insert操作，并传入变量信息，返回插入主键")
	public Object insert(RuntimeContext runtimeContext,
						 @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml,
						 @Comment(name = "params", value = "变量信息") Map<String, Object> params) {
		return insert(runtimeContext, sqlOrXml, null, params);
	}

	/**
	 * 插入并返回主键
	 */
	@Comment("执行insert操作，返回插入主键")
	public Object insert(RuntimeContext runtimeContext,
						 @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml,
						 @Comment(name = "primary", value = "主键列") String primary) {
		return insert(runtimeContext, sqlOrXml, primary, null);
	}

	/**
	 * 插入并返回主键
	 */
	@Comment("执行insert操作，并传入主键和变量信息，返回插入主键")
	public Object insert(RuntimeContext runtimeContext,
						 @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml,
						 @Comment(name = "primary", value = "主键列") String primary,
						 @Comment(name = "params", value = "变量信息") Map<String, Object> params) {
		return insert(new BoundSql(runtimeContext, sqlOrXml, params, this), primary);
	}

	void insert(BoundSql boundSql, MagicKeyHolder keyHolder) {
		assertDatasourceNotNull();
		dataSourceNode.getJdbcTemplate().update(con -> {
			PreparedStatement ps = keyHolder.createPrepareStatement(con, boundSql.getSql());
			new ArgumentPreparedStatementSetter(boundSql.getParameters()).setValues(ps);
			return ps;
		}, keyHolder);
		if (this.cacheName != null) {
			this.sqlCache.delete(this.cacheName);
		}
	}

	/**
	 * 插入并返回主键
	 */
	@Comment("批量执行insert操作，返回插入主键数组")
	public int[] batchInsert(@Comment(name = "sql", value = "`SQL`语句") String sql,
							 @Comment(name = "list", value = "参数") List<Object[]> list) {
		assertDatasourceNotNull();
		return dataSourceNode.getJdbcTemplate().batchUpdate(sql, list);
	}

	/**
	 * 插入并返回主键
	 */
	@Comment("批量执行insert操作，返回插入主键数组")
	public int[] batchInsert(@Comment(name = "sqls", value = "`SQL`语句") String[] sqls) {
		assertDatasourceNotNull();
		return dataSourceNode.getJdbcTemplate().batchUpdate(sqls);
	}

	@UnableCall
	public Object insert(BoundSql boundSql, String primary) {
		MagicKeyHolder keyHolder = new MagicKeyHolder(primary);
		RequestEntity requestEntity = RequestContext.getRequestEntity();
		sqlInterceptors.forEach(sqlInterceptor -> sqlInterceptor.preHandle(boundSql, requestEntity));
		insert(boundSql, keyHolder);
		Object value = keyHolder.getObjectKey();
		for (SQLInterceptor sqlInterceptor : sqlInterceptors) {
			value = sqlInterceptor.postHandle(boundSql, value, requestEntity);
		}
		return value;
	}

	/**
	 * 分页查询
	 */
	@Comment("执行分页查询，分页条件自动获取")
	public Object page(RuntimeContext runtimeContext,
					   @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml,
					   @Comment(name = "params", value = "变量信息") Map<String, Object> params) {
		return page(new BoundSql(runtimeContext, sqlOrXml, params, this));
	}

	/**
	 * 分页查询,并传入变量信息
	 */
	@Comment("执行分页查询，并传入变量信息，分页条件自动获取")
	public Object page(RuntimeContext runtimeContext,
					   @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml) {
		return page(runtimeContext, sqlOrXml, (Map<String, Object>) null);
	}

	/**
	 * 分页查询（手动传入limit和offset参数）
	 */
	@Comment("执行分页查询，分页条件手动传入")
	public Object page(RuntimeContext runtimeContext,
					   @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml,
					   @Comment(name = "limit", value = "限制条数") long limit,
					   @Comment(name = "offset", value = "跳过条数") long offset) {
		return page(runtimeContext, sqlOrXml, limit, offset, null);
	}

	/**
	 * 分页查询（手动传入limit和offset参数）
	 */
	@Comment("执行分页查询，并传入变量信息，分页条件手动传入")
	public Object page(RuntimeContext runtimeContext,
					   @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml,
					   @Comment(name = "limit", value = "限制条数") long limit,
					   @Comment(name = "offset", value = "跳过条数") long offset,
					   @Comment(name = "params", value = "变量信息") Map<String, Object> params) {
		BoundSql boundSql = new BoundSql(runtimeContext, sqlOrXml, params, this);
		return page(boundSql, new Page(limit, offset));
	}

	@UnableCall
	public Object page(BoundSql boundSql) {
		Page page = pageProvider.getPage(boundSql.getRuntimeContext());
		return page(boundSql, page);
	}

	@UnableCall
	public String getDataSourceName() {
		return this.dataSourceNode == null ? "unknown" : dataSourceNode.getName();
	}

	/**
	 * 分页查询（手动传入分页SQL语句）
	 */
	@Comment("执行分页查询，分页`SQL`语句手动传入")
	public Object page(RuntimeContext runtimeContext,
					   @Comment(name = "countSqlOrXml", value = "count语句") String countSqlOrXml,
					   @Comment(name = "sqlOrXml", value = "查询语句") String sqlOrXml) {
		return page(runtimeContext, countSqlOrXml, sqlOrXml, null);
	}

	/**
	 * 分页查询（手动传入分页SQL语句）
	 */
	@Comment("执行分页查询，并传入变量信息，分页`SQL`countSqlOrXml")
	public Object page(RuntimeContext runtimeContext,
					   @Comment(name = "countSqlOrXml", value = "count语句") String countSqlOrXml,
					   @Comment(name = "sqlOrXml", value = "查询语句") String sqlOrXml,
					   @Comment(name = "params", value = "变量信息") Map<String, Object> params) {
		int count = selectInt(new BoundSql(runtimeContext, countSqlOrXml, params, this));
		Page page = pageProvider.getPage(runtimeContext);
		BoundSql boundSql = new BoundSql(runtimeContext, sqlOrXml, params, this);
		return page(count, boundSql, page, null);
	}

	private Object page(int count, BoundSql boundSql, Page page, Dialect dialect) {
		List<Map<String, Object>> list = null;
		if (count > 0) {
			if (dialect == null) {
				dialect = dataSourceNode.getDialect(dialectAdapter);
			}
			BoundSql pageBoundSql = buildPageBoundSql(dialect, boundSql, page.getOffset(), page.getLimit());
			list = pageBoundSql.execute(this.sqlInterceptors, () -> queryForList(pageBoundSql));
		}
		RequestEntity requestEntity = RequestContext.getRequestEntity();
		return resultProvider.buildPageResult(requestEntity, page, count, list);
	}

	@UnableCall
	public Object page(BoundSql boundSql, Page page) {
		assertDatasourceNotNull();
		Dialect dialect = dataSourceNode.getDialect(dialectAdapter);
		BoundSql countBoundSql = boundSql.copy(dialect.getCountSql(boundSql.getSql()));
		int count = selectInt(countBoundSql);
		return page(count, boundSql, page, dialect);
	}

	/**
	 * 查询int值
	 */
	@Comment("查询int值，适合单行单列int的结果")
	public Integer selectInt(RuntimeContext runtimeContext,
							 @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml) {
		return selectInt(runtimeContext, sqlOrXml, null);
	}

	/**
	 * 查询int值
	 */
	@Comment("查询int值，并传入变量信息，适合单行单列int的结果")
	public Integer selectInt(RuntimeContext runtimeContext,
							 @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml,
							 @Comment(name = "params", value = "变量信息") Map<String, Object> params) {
		return selectInt(new BoundSql(runtimeContext, sqlOrXml, params, this));
	}

	@UnableCall
	public Integer selectInt(BoundSql boundSql) {
		assertDatasourceNotNull();
		return boundSql.execute(this.sqlInterceptors, () -> dataSourceNode.getJdbcTemplate().query(boundSql.getSql(), new SingleRowResultSetExtractor<>(Integer.class), boundSql.getParameters()));
	}

	/**
	 * 查询Map
	 */
	@Comment("查询单条结果，查不到返回null")
	public Map<String, Object> selectOne(RuntimeContext runtimeContext,
										 @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml) {
		return selectOne(runtimeContext, sqlOrXml, null);
	}

	/**
	 * 查询Map,并传入变量信息
	 */
	@Comment("查询单条结果，并传入变量信息，查不到返回null")
	public Map<String, Object> selectOne(RuntimeContext runtimeContext,
										 @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml,
										 @Comment(name = "params", value = "变量信息") Map<String, Object> params) {
		return selectOne(new BoundSql(runtimeContext, sqlOrXml, params, this));
	}

	@UnableCall
	public Map<String, Object> selectOne(BoundSql boundSql) {
		assertDatasourceNotNull();
		return boundSql.execute(this.sqlInterceptors, () -> {
			Map<String, Object> row = dataSourceNode.getJdbcTemplate().query(boundSql.getSql(), new SingleRowResultSetExtractor<>(this.columnMapRowMapper), boundSql.getParameters());
			if (row != null && boundSql.getExcludeColumns() != null) {
				boundSql.getExcludeColumns().forEach(row::remove);
			}
			return row;
		});
	}

	/**
	 * 查询单行单列的值
	 */
	@Comment("查询单行单列的值")
	public Object selectValue(RuntimeContext runtimeContext,
							  @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml) {
		return selectValue(runtimeContext, sqlOrXml, null);
	}

	/**
	 * 查询单行单列的值，并传入变量信息
	 */
	@Comment("查询单行单列的值，并传入变量信息")
	public Object selectValue(RuntimeContext runtimeContext,
							  @Comment(name = "sqlOrXml", value = "`SQL`语句或`xml`") String sqlOrXml,
							  @Comment(name = "params", value = "变量信息") Map<String, Object> params) {
		assertDatasourceNotNull();
		BoundSql boundSql = new BoundSql(runtimeContext, sqlOrXml, params, this);
		return boundSql.execute(this.sqlInterceptors, () -> dataSourceNode.getJdbcTemplate().query(boundSql.getSql(), new SingleRowResultSetExtractor<>(Object.class), boundSql.getParameters()));
	}

	@Comment("指定table，进行单表操作")
	public NamedTable table(@Comment(name = "tableName", value = "表名") String tableName) {
		return new NamedTable(tableName, this, rowMapColumnMapper, namedTableInterceptors);
	}

	private BoundSql buildPageBoundSql(Dialect dialect, BoundSql boundSql, long offset, long limit) {
		String pageSql = dialect.getPageSql(boundSql.getSql(), boundSql, offset, limit);
		return boundSql.copy(pageSql);
	}

	@UnableCall
	@Override
	public String getModuleName() {
		return "db";
	}

	static class MagicKeyHolder extends GeneratedKeyHolder {

		private final boolean useGeneratedKeys;

		private final String primary;

		public MagicKeyHolder() {
			this(null);
		}

		public MagicKeyHolder(String primary) {
			this.primary = primary;
			this.useGeneratedKeys = StringUtils.isBlank(primary);
		}

		PreparedStatement createPrepareStatement(Connection connection, String sql) throws SQLException {
			if (useGeneratedKeys) {
				return connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			}
			return connection.prepareStatement(sql, new String[]{primary});
		}

		public Object getObjectKey() {
			List<Map<String, Object>> keyList = getKeyList();
			if (keyList.isEmpty()) {
				return null;
			}
			Iterator<Object> keyIterator = keyList.get(0).values().iterator();
			Object key = keyIterator.hasNext() ? keyIterator.next() : null;
			if (key != null && "oracle.sql.ROWID".equals(key.getClass().getName())) {
				return ScriptManager.executeExpression("row.stringValue()", Collections.singletonMap("row", key));
			}
			return key;
		}
	}

}
