package com.ibm.fsd.assignment5.config;


import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@PropertySource({"classpath:application.properties"})
@EnableJpaRepositories(basePackages = { "com.ibm.fsd.assignment5.repository" })
@EnableTransactionManagement
class PersistenceContext {
	 
    @Autowired
    private Environment env;
 
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
        emf.setDataSource(dataSource());
        emf.setPackagesToScan("com.ibm.fsd.assignment5.model");
 
        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        emf.setJpaVendorAdapter(vendorAdapter);
        emf.setJpaProperties(additionalProperties());
 
        return emf;
    }
 
    @Bean
    public DataSource dataSource() {
//        DriverManagerDataSource dataSource = new DriverManagerDataSource();
//        dataSource.setDriverClassName(env.getProperty("database.connection.driver"));
//        dataSource.setUrl(env.getProperty("database.connection.url"));
//        dataSource.setUsername(env.getProperty("database.connection.user"));
//        dataSource.setPassword(env.getProperty("database.connection.password"));
//        return dataSource;
    	EmbeddedDatabase db = new EmbeddedDatabaseBuilder()
  		      .setName("testdb;DB_CLOSE_DELAY=-1;")
  		      .setType(EmbeddedDatabaseType.H2)
  		      .setScriptEncoding("UTF-8")
  		      .ignoreFailedDrops(true)
  		      .addScripts("classpath:schema.sql", "classpath:data.sql")
  		      .build();
    	return db;
    }
 
    @Bean
    public PlatformTransactionManager transactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
 
        return transactionManager;
    }
 
    @Bean
    public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
        return new PersistenceExceptionTranslationPostProcessor();
    }
 
    Properties additionalProperties() {
        return new Properties() {
            {  // Hibernate Specific:
                setProperty("hibernate.hbm2ddl.auto", env.getProperty("database.hibernate.schema_update"));
                setProperty("hibernate.dialect", env.getProperty("database.hibernate.dialect"));
                setProperty("hibernate.show_sql", env.getProperty("database.hibernate.show_sql"));
                setProperty("hibernate.format_sql", env.getProperty("database.hibernate.format_sql"));
                setProperty("hibernate.use_sql_comments", env.getProperty("database.hibernate.use_sql_comments"));
            }
        };
    }
	
	
}