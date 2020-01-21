"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_1 = __importDefault(require("next"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("./middlewares/helmet"));
const error_handler_1 = __importDefault(require("./middlewares/error-handler"));
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
app.renderOpts.poweredByHeader = false;
exports.default = app
    .prepare()
    .then(() => {
    const server = express_1.default();
    server.use(helmet_1.default);
    server.use(body_parser_1.default.urlencoded({ extended: false }));
    server.use(body_parser_1.default.json());
    server.get('/', (req, res) => app.render(req, res, '/', req.query));
    server.all('*', (req, res) => handle(req, res));
    server.use(error_handler_1.default);
    server.listen(port, err => {
        if (err)
            throw err;
        // eslint-disable-next-line no-console
        console.log(`> Ready on http://localhost:${port}`);
    });
})
    .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF1QjtBQUN2QixzREFBNkI7QUFDN0IsOERBQW9DO0FBRXBDLGtFQUE4QztBQUM5QyxnRkFBc0Q7QUFFdEQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNyRCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUE7QUFDakQsTUFBTSxHQUFHLEdBQUcsY0FBSSxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQTtBQUN2QixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtBQUN0QyxHQUFHLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUE7QUFFdEMsa0JBQWUsR0FBRztLQUNmLE9BQU8sRUFBRTtLQUNULElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDVCxNQUFNLE1BQU0sR0FBRyxpQkFBTyxFQUFFLENBQUE7SUFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBVyxDQUFDLENBQUE7SUFFdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUE7SUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFFN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBRW5FLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBRS9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQVksQ0FBQyxDQUFBO0lBRXhCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1FBQ3hCLElBQUksR0FBRztZQUFFLE1BQU0sR0FBRyxDQUFBO1FBQ2xCLHNDQUFzQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ3BELENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDO0tBQ0QsS0FBSyxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUU7SUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqQixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBuZXh0IGZyb20gJ25leHQnXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInXG5cbmltcG9ydCBoZWxtZXRHdWFyZCBmcm9tICcuL21pZGRsZXdhcmVzL2hlbG1ldCdcbmltcG9ydCBlcnJvckhhbmRsZXIgZnJvbSAnLi9taWRkbGV3YXJlcy9lcnJvci1oYW5kbGVyJ1xuXG5jb25zdCBwb3J0ID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuUE9SVCB8fCAnMzAwMCcsIDEwKVxuY29uc3QgZGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJ1xuY29uc3QgYXBwID0gbmV4dCh7ZGV2fSlcbmNvbnN0IGhhbmRsZSA9IGFwcC5nZXRSZXF1ZXN0SGFuZGxlcigpXG5hcHAucmVuZGVyT3B0cy5wb3dlcmVkQnlIZWFkZXIgPSBmYWxzZVxuXG5leHBvcnQgZGVmYXVsdCBhcHBcbiAgLnByZXBhcmUoKVxuICAudGhlbigoKSA9PiB7XG4gICAgY29uc3Qgc2VydmVyID0gZXhwcmVzcygpXG4gICAgc2VydmVyLnVzZShoZWxtZXRHdWFyZClcblxuICAgIHNlcnZlci51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDogZmFsc2V9KSlcbiAgICBzZXJ2ZXIudXNlKGJvZHlQYXJzZXIuanNvbigpKVxuXG4gICAgc2VydmVyLmdldCgnLycsIChyZXEsIHJlcykgPT4gYXBwLnJlbmRlcihyZXEsIHJlcywgJy8nLCByZXEucXVlcnkpKVxuXG4gICAgc2VydmVyLmFsbCgnKicsIChyZXEsIHJlcykgPT4gaGFuZGxlKHJlcSwgcmVzKSlcblxuICAgIHNlcnZlci51c2UoZXJyb3JIYW5kbGVyKVxuXG4gICAgc2VydmVyLmxpc3Rlbihwb3J0LCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikgdGhyb3cgZXJyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coYD4gUmVhZHkgb24gaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9YClcbiAgICB9KVxuICB9KVxuICAuY2F0Y2goKGV4OiBhbnkpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGV4LnN0YWNrKVxuICAgIHByb2Nlc3MuZXhpdCgxKVxuICB9KVxuIl19