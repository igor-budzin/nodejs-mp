export class Utils {
  static async processBody(req) {
    return new Promise((resolve) => {
      let body = "";

      req.on('data', (с) => {
        body += с.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    });
  }
}