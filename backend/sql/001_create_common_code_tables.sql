-- Common code master tables for MariaDB.
-- cd_grp_id is entered by the user.
-- cd_dtl_id is generated sequentially by AUTO_INCREMENT.

CREATE TABLE IF NOT EXISTS tbl_cd_grp (
    cd_grp_id VARCHAR(50) NOT NULL COMMENT '코드그룹 ID',
    cd_grp_nm VARCHAR(100) NOT NULL COMMENT '코드그룹명',
    description VARCHAR(500) NULL COMMENT '설명',
    sort_order INT NOT NULL DEFAULT 0 COMMENT '정렬순서',
    use_yn CHAR(1) NOT NULL DEFAULT 'Y' COMMENT '사용여부',
    created_by VARCHAR(50) NULL COMMENT '생성자',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
    updated_by VARCHAR(50) NULL COMMENT '수정자',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
    PRIMARY KEY (cd_grp_id),
    CONSTRAINT chk_tbl_cd_grp_use_yn CHECK (use_yn IN ('Y', 'N'))
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='공통코드 그룹';

CREATE TABLE IF NOT EXISTS tbl_cd_dtl (
    cd_dtl_id BIGINT NOT NULL AUTO_INCREMENT COMMENT '코드상세 ID',
    cd_grp_id VARCHAR(50) NOT NULL COMMENT '코드그룹 ID',
    cd VARCHAR(50) NOT NULL COMMENT '상세코드',
    cd_nm VARCHAR(100) NOT NULL COMMENT '상세코드명',
    cd_val VARCHAR(200) NULL COMMENT '코드값',
    parent_cd_dtl_id BIGINT NULL COMMENT '상위 코드상세 ID',
    description VARCHAR(500) NULL COMMENT '설명',
    sort_order INT NOT NULL DEFAULT 0 COMMENT '정렬순서',
    use_yn CHAR(1) NOT NULL DEFAULT 'Y' COMMENT '사용여부',
    extra_value1 VARCHAR(200) NULL COMMENT '확장값1',
    extra_value2 VARCHAR(200) NULL COMMENT '확장값2',
    extra_value3 VARCHAR(200) NULL COMMENT '확장값3',
    created_by VARCHAR(50) NULL COMMENT '생성자',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
    updated_by VARCHAR(50) NULL COMMENT '수정자',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
    PRIMARY KEY (cd_dtl_id),
    UNIQUE KEY uk_tbl_cd_dtl_grp_cd (cd_grp_id, cd),
    KEY ix_tbl_cd_dtl_grp_sort (cd_grp_id, sort_order, cd_dtl_id),
    KEY ix_tbl_cd_dtl_parent (parent_cd_dtl_id),
    CONSTRAINT fk_tbl_cd_dtl_grp
        FOREIGN KEY (cd_grp_id)
        REFERENCES tbl_cd_grp (cd_grp_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_tbl_cd_dtl_parent
        FOREIGN KEY (parent_cd_dtl_id)
        REFERENCES tbl_cd_dtl (cd_dtl_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT chk_tbl_cd_dtl_use_yn CHECK (use_yn IN ('Y', 'N'))
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='공통코드 상세';
