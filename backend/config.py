import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
APP_ENV = os.getenv("APP_ENV", "local")
ENV_FILE = Path(os.getenv("BACKEND_ENV_FILE", BASE_DIR / f".env.{APP_ENV}"))


def load_env_file(path=ENV_FILE):
    if not path.exists():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()

        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip("'\""))


load_env_file()
