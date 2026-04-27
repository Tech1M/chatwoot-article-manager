"""
Chatwoot Help Center API client.
Handles articles, categories, and portals.
"""

import time
import requests


class ChatwootClient:
    def __init__(self, base_url: str, api_token: str, account_id: str = "1"):
        self.base_url = base_url.rstrip("/")
        self.account_id = account_id
        self.session = requests.Session()
        self.session.headers.update({
            "api_access_token": api_token,
            "Content-Type": "application/json",
        })

    def _url(self, path: str) -> str:
        return f"{self.base_url}/api/v1/accounts/{self.account_id}{path}"

    # -- Portals -----------------------------------------------------------

    def list_portals(self) -> list[dict]:
        resp = self.session.get(self._url("/portals"))
        resp.raise_for_status()
        data = resp.json()
        return data.get("payload", data) if isinstance(data, dict) else data

    # -- Categories --------------------------------------------------------

    def list_categories(self, portal_slug: str) -> list[dict]:
        resp = self.session.get(self._url(f"/portals/{portal_slug}/categories"))
        resp.raise_for_status()
        data = resp.json()
        return data.get("payload", data) if isinstance(data, dict) else data

    def create_category(self, portal_slug: str, name: str, slug: str, description: str = "", locale: str = "en") -> dict:
        payload = {"name": name, "slug": slug, "description": description, "locale": locale}
        resp = self.session.post(self._url(f"/portals/{portal_slug}/categories"), json=payload)
        resp.raise_for_status()
        return resp.json()

    # -- Articles ----------------------------------------------------------

    def list_articles(self, portal_slug: str) -> list[dict]:
        """Fetch all articles with pagination."""
        articles = []
        page = 1
        while True:
            resp = self.session.get(
                self._url(f"/portals/{portal_slug}/articles"),
                params={"page": page},
            )
            resp.raise_for_status()
            data = resp.json()
            batch = data.get("payload", data) if isinstance(data, dict) else data
            if not batch:
                break
            articles.extend(batch)
            if len(batch) < 25:
                break
            page += 1
            time.sleep(0.1)
        return articles

    def create_article(self, portal_slug: str, data: dict) -> dict:
        resp = self.session.post(
            self._url(f"/portals/{portal_slug}/articles"),
            json=data,
        )
        resp.raise_for_status()
        return resp.json()

    def update_article(self, portal_slug: str, article_id: int, data: dict) -> dict:
        resp = self.session.put(
            self._url(f"/portals/{portal_slug}/articles/{article_id}"),
            json=data,
        )
        resp.raise_for_status()
        return resp.json()

    def delete_article(self, portal_slug: str, article_id: int) -> None:
        resp = self.session.delete(
            self._url(f"/portals/{portal_slug}/articles/{article_id}"),
        )
        resp.raise_for_status()

