# Monorepo: FastAPI + React (Vite)

개발 모드(권장): FastAPI 백엔드는 포트 `8000`, Vite 개발 서버는 `5173`에서 실행합니다. Vite는 `/api`로 시작하는 요청을 `http://localhost:8000`으로 프록시합니다.

백엔드 실행

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

프런트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

빌드 후 FastAPI로 서빙(옵션)

```bash
# 프런트 빌드
cd frontend
npm run build
# 빌드된 정적 파일은 frontend/dist 에 생성됩니다.
# FastAPI에서 StaticFiles로 서빙하도록 backend를 수정하거나, 별도 정적 서버를 사용하세요.
```
