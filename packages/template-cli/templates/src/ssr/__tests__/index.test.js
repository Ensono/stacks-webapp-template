"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("@testing-library/react");
const index_1 = __importDefault(require("../pages/index"));
const indexPageText = `Welcome to Stacks-react app! your current environemnt is: ${process.env.NODE_ENV}`;
test('With React Testing Library page renders tag type <div> with text', () => {
    const { getByText } = react_1.render(<index_1.default />);
    expect(getByText(indexPageText)).not.toBeNull();
});
test('With React Testing Library Snapshot renders page', () => {
    const { asFragment } = react_1.render(<index_1.default />);
    expect(asFragment()).toMatchSnapshot();
});
test('With React Testing Library page rerenders with hydrate', () => {
    const { getByText, rerender } = react_1.render(<index_1.default />);
    expect(getByText(indexPageText)).not.toBeNull();
    // Rerender: Calls render again passing in the original arguments and sets hydrate to true.
    rerender(<index_1.default />);
    expect(getByText(indexPageText)).not.toBeNull();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQjtBQUMvQixrREFBZ0Q7QUFDaEQsMkRBQWlDO0FBRWpDLE1BQU0sYUFBYSxHQUFHLDZEQUE2RCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBRTFHLElBQUksQ0FBQyxrRUFBa0UsRUFBRSxHQUFHLEVBQUU7SUFDNUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLGNBQU0sQ0FBQyxDQUFDLGVBQUcsQ0FBQyxBQUFELEVBQUcsQ0FBQyxDQUFDO0lBRXRDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbEQsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsa0RBQWtELEVBQUUsR0FBRyxFQUFFO0lBQzVELE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxjQUFNLENBQUMsQ0FBQyxlQUFHLENBQUMsQUFBRCxFQUFHLENBQUMsQ0FBQztJQUV2QyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUN6QyxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyx3REFBd0QsRUFBRSxHQUFHLEVBQUU7SUFDbEUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxjQUFNLENBQUMsQ0FBQyxlQUFHLENBQUMsQUFBRCxFQUFHLENBQUMsQ0FBQztJQUNoRCxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRWhELDJGQUEyRjtJQUMzRixRQUFRLENBQUMsQ0FBQyxlQUFHLENBQUMsQUFBRCxFQUFHLENBQUMsQ0FBQztJQUNsQixNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2xELENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnQHRlc3RpbmctbGlicmFyeS9yZWFjdCc7XG5pbXBvcnQgQXBwIGZyb20gJy4uL3BhZ2VzL2luZGV4JztcblxuY29uc3QgaW5kZXhQYWdlVGV4dCA9IGBXZWxjb21lIHRvIFN0YWNrcy1yZWFjdCBhcHAhIHlvdXIgY3VycmVudCBlbnZpcm9uZW1udCBpczogJHtwcm9jZXNzLmVudi5OT0RFX0VOVn1gO1xuXG50ZXN0KCdXaXRoIFJlYWN0IFRlc3RpbmcgTGlicmFyeSBwYWdlIHJlbmRlcnMgdGFnIHR5cGUgPGRpdj4gd2l0aCB0ZXh0JywgKCkgPT4ge1xuICBjb25zdCB7IGdldEJ5VGV4dCB9ID0gcmVuZGVyKDxBcHAgLz4pO1xuXG4gIGV4cGVjdChnZXRCeVRleHQoaW5kZXhQYWdlVGV4dCkpLm5vdC50b0JlTnVsbCgpO1xufSk7XG5cbnRlc3QoJ1dpdGggUmVhY3QgVGVzdGluZyBMaWJyYXJ5IFNuYXBzaG90IHJlbmRlcnMgcGFnZScsICgpID0+IHtcbiAgY29uc3QgeyBhc0ZyYWdtZW50IH0gPSByZW5kZXIoPEFwcCAvPik7XG5cbiAgZXhwZWN0KGFzRnJhZ21lbnQoKSkudG9NYXRjaFNuYXBzaG90KCk7XG59KTtcblxudGVzdCgnV2l0aCBSZWFjdCBUZXN0aW5nIExpYnJhcnkgcGFnZSByZXJlbmRlcnMgd2l0aCBoeWRyYXRlJywgKCkgPT4ge1xuICBjb25zdCB7IGdldEJ5VGV4dCwgcmVyZW5kZXIgfSA9IHJlbmRlcig8QXBwIC8+KTtcbiAgZXhwZWN0KGdldEJ5VGV4dChpbmRleFBhZ2VUZXh0KSkubm90LnRvQmVOdWxsKCk7XG5cbiAgLy8gUmVyZW5kZXI6IENhbGxzIHJlbmRlciBhZ2FpbiBwYXNzaW5nIGluIHRoZSBvcmlnaW5hbCBhcmd1bWVudHMgYW5kIHNldHMgaHlkcmF0ZSB0byB0cnVlLlxuICByZXJlbmRlcig8QXBwIC8+KTtcbiAgZXhwZWN0KGdldEJ5VGV4dChpbmRleFBhZ2VUZXh0KSkubm90LnRvQmVOdWxsKCk7XG59KTtcbiJdfQ==