package org.ssssssss.magicapi.dialect;

/**
 * ClickHouse方言
 *
 * @author mxd
 */
public class ClickhouseDialect extends MySQLDialect {

	@Override
	public boolean match(String jdbcUrl) {
		return jdbcUrl.contains(":clickhouse:");
	}
}
