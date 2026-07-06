# FastAPI 샘플 프로젝트

간단한 FastAPI 예제입니다.

설치

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

실행

```bash
uvicorn main:app --reload
```

테스트 예시

```bash
# 루트 확인
curl http://127.0.0.1:8000/

# 아이템 생성
curl -X POST "http://127.0.0.1:8000/items/" -H "Content-Type: application/json" -d '{"id":1,"name":"Sample","price":9.99}'

# 아이템 조회
curl http://127.0.0.1:8000/items/1
```
