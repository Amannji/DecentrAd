import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  afterEach
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CloneCreated, OwnershipTransferred } from "../generated/schema"
import { CloneCreated as CloneCreatedEvent, OwnershipTransferred as OwnershipTransferredEvent } from "../generated/DecentradFactory/DecentradFactory"
import { handleCloneCreated, handleOwnershipTransferred } from "../src/decentrad-factory"
import { createCloneCreatedEvent, createOwnershipTransferredEvent } from "./decentrad-factory-utils"

describe("DecentradFactory Contract Tests", () => {
  
  afterEach(() => {
    clearStore()
  })

  describe("CloneCreated Event", () => {
    test("Should properly handle and store CloneCreated event", () => {
      // Arrange
      const date = BigInt.fromI32(234)
      const message = "New Publisher Contract Created"
      const cloneAddress = Address.fromString("0x0000000000000000000000000000000000000001")
      const event = createCloneCreatedEvent(date, message, cloneAddress)

      // Act
      handleCloneCreated(event)
      console.log("event",);
      // Assert
      assert.entityCount("CloneCreated", 1)
      
      const id = event.transaction.hash.concatI32(event.logIndex.toI32())
      assert.fieldEquals("CloneCreated", id.toHexString(), "date", date.toString())
      assert.fieldEquals("CloneCreated", id.toHexString(), "message", message)
      assert.fieldEquals("CloneCreated", id.toHexString(), "cloneAddress", cloneAddress.toHexString())
      assert.fieldEquals("CloneCreated", id.toHexString(), "blockNumber", event.block.number.toString())
      assert.fieldEquals("CloneCreated", id.toHexString(), "blockTimestamp", event.block.timestamp.toString())
      assert.fieldEquals("CloneCreated", id.toHexString(), "transactionHash", event.transaction.hash.toHexString())
    })

    test("Should handle multiple CloneCreated events", () => {
      // Arrange
      const events = [
        createCloneCreatedEvent(
          BigInt.fromI32(234),
          "First Clone",
          Address.fromString("0x0000000000000000000000000000000000000001")
        ),
        createCloneCreatedEvent(
          BigInt.fromI32(345),
          "Second Clone",
          Address.fromString("0x0000000000000000000000000000000000000002")
        )
      ]

      // Act
      events.forEach(event => handleCloneCreated(event))

      // Assert
      assert.entityCount("CloneCreated", 2)
    })
  })

  describe("OwnershipTransferred Event", () => {
    test("Should properly handle and store OwnershipTransferred event", () => {
      // Arrange
      const previousOwner = Address.fromString("0x0000000000000000000000000000000000000001")
      const newOwner = Address.fromString("0x0000000000000000000000000000000000000002")
      const event = createOwnershipTransferredEvent(previousOwner, newOwner)

      // Act
      handleOwnershipTransferred(event)

      // Assert
      assert.entityCount("OwnershipTransferred", 1)
      
      const id = event.transaction.hash.concatI32(event.logIndex.toI32())
      assert.fieldEquals(
        "OwnershipTransferred",
        id.toHexString(),
        "previousOwner",
        previousOwner.toHexString()
      )
      assert.fieldEquals(
        "OwnershipTransferred", 
        id.toHexString(),
        "newOwner",
        newOwner.toHexString()
      )
      assert.fieldEquals(
        "OwnershipTransferred",
        id.toHexString(),
        "blockNumber",
        event.block.number.toString()
      )
      assert.fieldEquals(
        "OwnershipTransferred",
        id.toHexString(),
        "blockTimestamp",
        event.block.timestamp.toString()
      )
      assert.fieldEquals(
        "OwnershipTransferred",
        id.toHexString(),
        "transactionHash",
        event.transaction.hash.toHexString()
      )
    })

    test("Should handle ownership transfer chain", () => {
      // Arrange
      const owner1 = Address.fromString("0x0000000000000000000000000000000000000001")
      const owner2 = Address.fromString("0x0000000000000000000000000000000000000002") 
      const owner3 = Address.fromString("0x0000000000000000000000000000000000000003")
      
      const events = [
        createOwnershipTransferredEvent(owner1, owner2),
        createOwnershipTransferredEvent(owner2, owner3)
      ]

      // Act
      events.forEach(event => handleOwnershipTransferred(event))

      // Assert
      assert.entityCount("OwnershipTransferred", 2)
    })
  })
})
