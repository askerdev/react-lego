import { Backdrop } from "./components/Backdrop/Backdrop";
import { Card } from "./components/Card";
import { Portal } from "./components/Portal";
import {
  HideOnClick,
  HideOnKeyDown,
  VisibilityContent,
  VisibilityProvider,
  VisibilityTrigger,
} from "./components/Visibility";

const App = () => {
  return (
    <>
      <VisibilityProvider name="alert">
        <VisibilityTrigger>
          <button>toggle modal 1</button>
        </VisibilityTrigger>
      </VisibilityProvider>

      <VisibilityProvider name="alert">
        <VisibilityContent>
          <Portal>
            <HideOnKeyDown keyName="Escape" />
            <HideOnClick>
              <Backdrop>
                <Card>
                  Hello, world 2!
                  <HideOnClick>
                    <button>close</button>
                  </HideOnClick>
                </Card>
              </Backdrop>
            </HideOnClick>
          </Portal>
        </VisibilityContent>
      </VisibilityProvider>
    </>
  );
};

export default App;
