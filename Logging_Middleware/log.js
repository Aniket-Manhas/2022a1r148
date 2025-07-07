const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMDIyYTFyMTQ4QG1pZXRqYW1tdS5pbiIsImV4cCI6MTc1MTg2OTI2OSwiaWF0IjoxNzUxODY4MzY5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZjJmZmE3YWMtOTNlNC00NWZkLTk0NmYtNzY2YTAwN2U2ZGI0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW5pa2V0IG1hbmhhcyIsInN1YiI6IjQxMzZhMmViLWQyYmMtNGYzZi04ZjRiLTJiOTUzYjE5OTIzOCJ9LCJlbWFpbCI6IjIwMjJhMXIxNDhAbWlldGphbW11LmluIiwibmFtZSI6ImFuaWtldCBtYW5oYXMiLCJyb2xsTm8iOiIyMDIyYTFyMTQ4IiwiYWNjZXNzQ29kZSI6IkZZalFIYyIsImNsaWVudElEIjoiNDEzNmEyZWItZDJiYy00ZjNmLThmNGItMmI5NTNiMTk5MjM4IiwiY2xpZW50U2VjcmV0IjoiVFBmVEtqWFZqQkpTdFBOeCJ9.P4whU48JuVWxZim2JzGTs0sLtyGzBGu4MX55n3gA3SM";

export async function Log(stack, level, pkg, message) {
  try {
    const response = await fetch(
      "http://20.244.56.144/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          stack: stack.toLowerCase(),
          level: level.toLowerCase(),
          package: pkg.toLowerCase(),
          message: message,
        }),
      }
    );

    const data = await response.json();
    console.log("Log response:", data);
  } catch (error) {
    console.error("Logging failed:", error);
  }
}
