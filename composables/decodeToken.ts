import jwtDecode from "jwt-decode";

export function decodeToken(token: string) {
  return jwtDecode<{ sub: number, username: string }>(token);
}