import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CloneCreated } from "../generated/schema"
import { CloneCreated as CloneCreatedEvent } from "../generated/DecentradFactory/DecentradFactory"
import { handleCloneCreated } from "../src/decentrad-factory"
import { createCloneCreatedEvent } from "./decentrad-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let date = BigInt.fromI32(234)
    let message = "Example string value"
    let cloneAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newCloneCreatedEvent = createCloneCreatedEvent(
      date,
      message,
      cloneAddress
    )
    handleCloneCreated(newCloneCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CloneCreated created and stored", () => {
    assert.entityCount("CloneCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CloneCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "date",
      "234"
    )
    assert.fieldEquals(
      "CloneCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "message",
      "Example string value"
    )
    assert.fieldEquals(
      "CloneCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "cloneAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
