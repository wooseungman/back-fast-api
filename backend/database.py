from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# MariaDB 연결 설정
DATABASE_URL = "mysql+pymysql://skycow79:user1234@localhost:3306/fastapi_db"

engine = create_engine(
    DATABASE_URL,
    echo=True,              # SQL 쿼리 출력 (개발용)
    pool_pre_ping=True,     # 연결 상태 확인
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
