'use client'; //“使用客户端” ——error.tsx需要是一个客户端组件。
 
import { useEffect } from 'react';
 
export default function Error({
  error, // 这个error对象包含了错误的信息，包括错误的类型、错误的消息和错误的堆栈信息。
  reset, // 这个reset函数是一个React Router提供的函数，用于重置路由状态。
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}