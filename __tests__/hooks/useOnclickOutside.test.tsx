import { render, screen, fireEvent } from "@testing-library/react";
import useClickOutside from "hooks/useClickOutside";
import { useRef } from "react";

// Helper component to use the hook
const TestComponent = ({ action }: { action: () => void }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useClickOutside({
    popupRef,
    buttonRef,
    action,
  });

  return (
    <div>
      <button ref={buttonRef}>Button</button>
      <div ref={popupRef} data-testid="popup">
        Popup
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
};

describe("useClickOutside", () => {
  it("should call the action when clicking outside of both popup and button", () => {
    const action = jest.fn();
    render(<TestComponent action={action} />);

    fireEvent.mouseDown(screen.getByTestId("popup"));
    expect(action).not.toHaveBeenCalled();

    fireEvent.mouseDown(screen.getByText("Button"));
    expect(action).not.toHaveBeenCalled();

    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(action).toHaveBeenCalled();
  });

  it("should not call the action when clicking inside the popup or button", () => {
    const action = jest.fn();
    render(<TestComponent action={action} />);

    fireEvent.mouseDown(screen.getByTestId("popup"));
    expect(action).not.toHaveBeenCalled();

    fireEvent.mouseDown(screen.getByText("Button"));
    expect(action).not.toHaveBeenCalled();
  });
});
