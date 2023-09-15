import React, { useEffect } from "react";
import { render } from "@testing-library/react";
import { useMutex } from "../useMutex";

type MockMutexProps = {
  timeoutDuration: number;
  executeFetchAfterMs?: number;
  mutexKey: string;
  callbackFunction: () => void;
};

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const useMockFetch = (props: MockMutexProps) => {
  const MutexRunner = useMutex();
  const mutex = new MutexRunner(props.mutexKey);

  useEffect(() => {
    const executeFetch = async () => {
      if (props.executeFetchAfterMs) {
        await timeout(props.executeFetchAfterMs);
      }

      mutex.run(async () => {
        mutex.lock();
        // Mimic a fetch
        await timeout(props.timeoutDuration);
        props.callbackFunction();
        mutex.unlock();
      });
    };

    executeFetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-dep

  return null;
};

const MockFetchComponent: React.FC<MockMutexProps> = (props) => {
  useMockFetch(props);
  return null;
};

describe("useMutex", () => {
  const fetchDuration = 100;
  let mockFetch = jest.fn();

  beforeEach(() => {
    mockFetch = jest.fn();
  });

  it('should only run "mockFetch()" once while using the "useMockFetch()" hook twice simultaneously', (done) => {
    // arrange + act
    render(
      <>
        <MockFetchComponent
          timeoutDuration={fetchDuration}
          mutexKey={"uniqueKey1"}
          callbackFunction={mockFetch}
        />
        <MockFetchComponent
          timeoutDuration={fetchDuration}
          mutexKey={"uniqueKey1"}
          callbackFunction={mockFetch}
        />
      </>
    );

    // assert
    setTimeout(() => {
      expect(mockFetch).toBeCalledTimes(1);
      done();
    }, fetchDuration);
  });

  it("should run all callback functions when provided unique mutex keys", (done) => {
    // arrange + act
    render(
      <>
        <MockFetchComponent
          timeoutDuration={fetchDuration}
          mutexKey={"uniqueKey1"}
          callbackFunction={mockFetch}
        />
        <MockFetchComponent
          timeoutDuration={fetchDuration}
          mutexKey={"uniqueKey2"}
          callbackFunction={mockFetch}
        />
      </>
    );

    // assert
    setTimeout(() => {
      expect(mockFetch).toBeCalledTimes(2);
      done();
    }, fetchDuration);
  });

  it('should only run "mockFetch()" twice when "useMockFetch()" is called sequential', (done) => {
    // arrange + act
    render(
      <>
        <MockFetchComponent
          timeoutDuration={fetchDuration}
          mutexKey={"uniqueKey1"}
          callbackFunction={mockFetch}
        />
        <MockFetchComponent
          timeoutDuration={fetchDuration}
          executeFetchAfterMs={fetchDuration}
          mutexKey={"uniqueKey1"}
          callbackFunction={mockFetch}
        />
      </>
    );

    // assert
    setTimeout(() => {
      expect(mockFetch).toBeCalledTimes(2);
      done();
    }, fetchDuration * 3);
  });
});
