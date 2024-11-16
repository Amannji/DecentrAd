import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { AdvAddedToAdvSpace } from "../generated/schema"
import { AdvAddedToAdvSpace as AdvAddedToAdvSpaceEvent } from "../generated/Decentrad/Decentrad"
import { handleAdvAddedToAdvSpace } from "../src/decentrad"
import { createAdvAddedToAdvSpaceEvent } from "./decentrad-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _advSpaceId = Bytes.fromI32(1234567890)
    let _advId = Bytes.fromI32(1234567890)
    let _advertiser = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAdvAddedToAdvSpaceEvent = createAdvAddedToAdvSpaceEvent(
      _advSpaceId,
      _advId,
      _advertiser
    )
    handleAdvAddedToAdvSpace(newAdvAddedToAdvSpaceEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AdvAddedToAdvSpace created and stored", () => {
    assert.entityCount("AdvAddedToAdvSpace", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AdvAddedToAdvSpace",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_advSpaceId",
      "1234567890"
    )
    assert.fieldEquals(
      "AdvAddedToAdvSpace",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_advId",
      "1234567890"
    )
    assert.fieldEquals(
      "AdvAddedToAdvSpace",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_advertiser",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
