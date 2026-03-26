"use client"

export async function getToken() {
  const res = await fetch('/api/token');
  const data = await res.json();
  return data.token;
}