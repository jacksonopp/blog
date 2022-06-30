import React from 'react'
import { trpc } from '../utils/trpc';

type Props = {}

const DemoPage = (props: Props) => {
  const {data, isLoading, isError, error} = trpc.useQuery(['example.restricted']);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    // A white card in the middle of the page
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-center text-2xl font-bold mb-4">
          {data?.content}
        </h1>
      </div>
    </div>
  )
}

export default DemoPage