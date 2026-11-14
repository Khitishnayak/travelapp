import { validateEmail } from "../services/validation";

describe("Validation Tests", () => {
    it("validates correct email", () => {
        expect(validateEmail("test@example.com")).toBe(true);
    });
    it("rejects invalid email", () => {
        expect(validateEmail("invalid-email")).toBe(false);
    });
});
