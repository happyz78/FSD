    create table ROLE (
       ROLE_ID integer not null,
        ROLE varchar(255),
        primary key (ROLE_ID)
    );
    
    create table USER (
       USER_ID integer not null,
        ACTIVE integer,
        EMAIL varchar(255),
        LAST_NAME varchar(255),
        NAME varchar(255),
        PASSWORD varchar(255),
        primary key (USER_ID)
    );
    
    create table USER_ROLE (
       USER_ID integer not null,
        ROLE_ID integer not null,
        primary key (USER_ID, ROLE_ID)
    );
create sequence hibernate_sequence start with 1 increment by 1;
create sequence USER_ID_SEQ start with 2 increment by 100;;

    alter table USER_ROLE 
       add constraint FKn1rn9qodd3u4le8uf3kl33qe3 
       foreign key (ROLE_ID) 
       references ROLE;
    
    alter table USER_ROLE 
       add constraint FKa8x5mvctia7u43u2mm3hyy5bm 
       foreign key (USER_ID) 
       references USER;