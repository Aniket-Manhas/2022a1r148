// Utility for LocalStorage persistence of shortened URLs and click stats

export interface ShortenedUrl {
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
  expiry: string;
}

export interface ClickData {
  timestamp: string;
  source: string;
  location: string;
}

const URLS_KEY = 'shortened_urls';
const CLICKS_KEY = 'click_stats';

export function saveShortenedUrl(url: ShortenedUrl) {
  const urls = getShortenedUrls();
  urls.push(url);
  localStorage.setItem(URLS_KEY, JSON.stringify(urls));
}

export function getShortenedUrls(): ShortenedUrl[] {
  const data = localStorage.getItem(URLS_KEY);
  return data ? JSON.parse(data) : [];
}

export function addClickToUrl(shortUrl: string, click: ClickData) {
  const allClicks = getAllClicks();
  if (!allClicks[shortUrl]) allClicks[shortUrl] = [];
  allClicks[shortUrl].push(click);
  localStorage.setItem(CLICKS_KEY, JSON.stringify(allClicks));
}

export function getClicksForUrl(shortUrl: string): ClickData[] {
  const allClicks = getAllClicks();
  return allClicks[shortUrl] || [];
}

function getAllClicks(): Record<string, ClickData[]> {
  const data = localStorage.getItem(CLICKS_KEY);
  return data ? JSON.parse(data) : {};
} 