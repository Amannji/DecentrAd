import {
  AdvAddedToAdvSpace as AdvAddedToAdvSpaceEvent,
  AdvApproved as AdvApprovedEvent,
  AdvContentUpdated as AdvContentUpdatedEvent,
  AdvPaymentUpdated as AdvPaymentUpdatedEvent,
  AdvRejected as AdvRejectedEvent,
  AdvRestarted as AdvRestartedEvent,
  AdvSpaceCreated as AdvSpaceCreatedEvent,
  AdvSpaceStatusChanged as AdvSpaceStatusChangedEvent,
  AdvSpaceUpdated as AdvSpaceUpdatedEvent,
  AdvStopped as AdvStoppedEvent,
  AdvertiserWithdraw as AdvertiserWithdrawEvent,
  Initialized as InitializedEvent,
  ModeratorAdded as ModeratorAddedEvent,
  ModeratorRemoved as ModeratorRemovedEvent,
  PublisherWithdraw as PublisherWithdrawEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  TokensDeposited as TokensDepositedEvent,
} from "../generated/Decentrad/Decentrad"
import {
  AdvAddedToAdvSpace,
  AdvApproved,
  AdvContentUpdated,
  AdvPaymentUpdated,
  AdvRejected,
  AdvRestarted,
  AdvSpaceCreated,
  AdvSpaceStatusChanged,
  AdvSpaceUpdated,
  AdvStopped,
  AdvertiserWithdraw,
  Initialized,
  ModeratorAdded,
  ModeratorRemoved,
  PublisherWithdraw,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TokensDeposited,
} from "../generated/schema"

export function handleAdvAddedToAdvSpace(event: AdvAddedToAdvSpaceEvent): void {
  let entity = new AdvAddedToAdvSpace(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advSpaceId = event.params._advSpaceId
  entity._advId = event.params._advId
  entity._advertiser = event.params._advertiser

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdvApproved(event: AdvApprovedEvent): void {
  let entity = new AdvApproved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advId = event.params._advId
  entity._approvedBy = event.params._approvedBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdvContentUpdated(event: AdvContentUpdatedEvent): void {
  let entity = new AdvContentUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advId = event.params._advId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdvPaymentUpdated(event: AdvPaymentUpdatedEvent): void {
  let entity = new AdvPaymentUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advId = event.params._advId
  entity._prevPayRate = event.params._prevPayRate
  entity._newPayRate = event.params._newPayRate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdvRejected(event: AdvRejectedEvent): void {
  let entity = new AdvRejected(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advId = event.params._advId
  entity._rejectedBy = event.params._rejectedBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdvRestarted(event: AdvRestartedEvent): void {
  let entity = new AdvRestarted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advId = event.params._advId
  entity._restartedBy = event.params._restartedBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdvSpaceCreated(event: AdvSpaceCreatedEvent): void {
  let entity = new AdvSpaceCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advSpaceId = event.params._advSpaceId
  entity._size = event.params._size
  entity._pageURL = event.params._pageURL

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdvSpaceStatusChanged(
  event: AdvSpaceStatusChangedEvent,
): void {
  let entity = new AdvSpaceStatusChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advSpaceId = event.params._advSpaceId
  entity._isEnabled = event.params._isEnabled

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdvSpaceUpdated(event: AdvSpaceUpdatedEvent): void {
  let entity = new AdvSpaceUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advSpaceId = event.params._advSpaceId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdvStopped(event: AdvStoppedEvent): void {
  let entity = new AdvStopped(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advId = event.params._advId
  entity._stoppedBy = event.params._stoppedBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdvertiserWithdraw(event: AdvertiserWithdrawEvent): void {
  let entity = new AdvertiserWithdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advId = event.params._advId
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleModeratorAdded(event: ModeratorAddedEvent): void {
  let entity = new ModeratorAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  // entity._modAddress = event.params._modAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleModeratorRemoved(event: ModeratorRemovedEvent): void {
  let entity = new ModeratorRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  // entity._modAddress = event.params._modAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePublisherWithdraw(event: PublisherWithdrawEvent): void {
  let entity = new PublisherWithdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advIds = event.params._advIds
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensDeposited(event: TokensDepositedEvent): void {
  let entity = new TokensDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._advId = event.params._advId
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
