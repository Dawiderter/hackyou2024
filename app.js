import { serveDir } from "@std/http/file-server";

const STATIC_PATH = "./static";

const handler = async (req) => {
    return serveDir(req, {
      fsRoot: STATIC_PATH,
    });
}

Deno.serve(handler)
