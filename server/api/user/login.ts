import axios from "axios";

// function parseExpiresValue(expiresValue: string) {
//   const expiresStr = expiresValue.replace("expires=", "").trim();
//   const expiresTimestamp = Date.parse(expiresStr);
//   return new Date(expiresTimestamp);
// }

export default defineEventHandler(async (event) => {
  const credentials = await readBody(event);
  const res = await axios("http://localhost:3001/auth/singIn", {
    method: "post",
    data: credentials,
    withCredentials: true,
  });
  const setCookieHeader = res.headers["set-cookie"];
  if (setCookieHeader) {
    setCookieHeader.forEach((cookie) => {
      const cookieParts = cookie.split(";");

      const [cookieName, cookieValue] = cookieParts[0].split("=");
      // const expires = cookieParts.find((part) =>
      //   part.trim().startsWith("expires=")
      // );
      const path = cookieParts.find((part) => part.trim().startsWith("path="));
      const httpOnly = !!cookieParts.find((part) =>
        part.trim().startsWith("HttpOnly")
      );
      const sameSite = cookieParts.find((part) =>
        part.trim().startsWith("SameSite=")
      );

      setCookie(event, cookieName, cookieValue, {
        httpOnly: httpOnly,
        sameSite: 'lax',
      });
    });
    return {status: 'ok'}
  }
});
