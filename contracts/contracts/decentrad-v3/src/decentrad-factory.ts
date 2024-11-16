import {
  CloneCreated as CloneCreatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/DecentradFactory/DecentradFactory"
import { CloneCreated, OwnershipTransferred } from "../generated/schema"
import { Decentrad } from "../generated/templates"

export function handleCloneCreated(event: CloneCreatedEvent): void {
  let entity = new CloneCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.date = event.params.date
  entity.message = event.params.message
  entity.cloneAddress = event.params.cloneAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  Decentrad.create(event.params.cloneAddress)
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
