import { sleep } from "../sleep.util";

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

describe("sleep", () => {
  test("should sleep for 250 miliseconds", () => {
    vi.spyOn(global, "setTimeout");
    sleep(250);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 250);
  });
});
