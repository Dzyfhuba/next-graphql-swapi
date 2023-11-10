'use client'
import People from "@/components/people"
import Urql from "@/providers/urql"

const Page = () => {
  return (
    <main>
      <Urql>
        <People />
      </Urql>
    </main>
  )
}

export default Page