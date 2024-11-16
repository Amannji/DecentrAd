import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
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
  TokensDeposited
} from "../generated/Decentrad/Decentrad"

export function createAdvAddedToAdvSpaceEvent(
  _advSpaceId: Bytes,
  _advId: Bytes,
  _advertiser: Address
): AdvAddedToAdvSpace {
  let advAddedToAdvSpaceEvent = changetype<AdvAddedToAdvSpace>(newMockEvent())

  advAddedToAdvSpaceEvent.parameters = new Array()

  advAddedToAdvSpaceEvent.parameters.push(
    new ethereum.EventParam(
      "_advSpaceId",
      ethereum.Value.fromFixedBytes(_advSpaceId)
    )
  )
  advAddedToAdvSpaceEvent.parameters.push(
    new ethereum.EventParam("_advId", ethereum.Value.fromFixedBytes(_advId))
  )
  advAddedToAdvSpaceEvent.parameters.push(
    new ethereum.EventParam(
      "_advertiser",
      ethereum.Value.fromAddress(_advertiser)
    )
  )

  return advAddedToAdvSpaceEvent
}

export function createAdvApprovedEvent(
  _advId: Bytes,
  _approvedBy: Address
): AdvApproved {
  let advApprovedEvent = changetype<AdvApproved>(newMockEvent())

  advApprovedEvent.parameters = new Array()

  advApprovedEvent.parameters.push(
    new ethereum.EventParam("_advId", ethereum.Value.fromFixedBytes(_advId))
  )
  advApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "_approvedBy",
      ethereum.Value.fromAddress(_approvedBy)
    )
  )

  return advApprovedEvent
}

export function createAdvContentUpdatedEvent(_advId: Bytes): AdvContentUpdated {
  let advContentUpdatedEvent = changetype<AdvContentUpdated>(newMockEvent())

  advContentUpdatedEvent.parameters = new Array()

  advContentUpdatedEvent.parameters.push(
    new ethereum.EventParam("_advId", ethereum.Value.fromFixedBytes(_advId))
  )

  return advContentUpdatedEvent
}

export function createAdvPaymentUpdatedEvent(
  _advId: Bytes,
  _prevPayRate: BigInt,
  _newPayRate: BigInt
): AdvPaymentUpdated {
  let advPaymentUpdatedEvent = changetype<AdvPaymentUpdated>(newMockEvent())

  advPaymentUpdatedEvent.parameters = new Array()

  advPaymentUpdatedEvent.parameters.push(
    new ethereum.EventParam("_advId", ethereum.Value.fromFixedBytes(_advId))
  )
  advPaymentUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "_prevPayRate",
      ethereum.Value.fromUnsignedBigInt(_prevPayRate)
    )
  )
  advPaymentUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "_newPayRate",
      ethereum.Value.fromUnsignedBigInt(_newPayRate)
    )
  )

  return advPaymentUpdatedEvent
}

export function createAdvRejectedEvent(
  _advId: Bytes,
  _rejectedBy: Address
): AdvRejected {
  let advRejectedEvent = changetype<AdvRejected>(newMockEvent())

  advRejectedEvent.parameters = new Array()

  advRejectedEvent.parameters.push(
    new ethereum.EventParam("_advId", ethereum.Value.fromFixedBytes(_advId))
  )
  advRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "_rejectedBy",
      ethereum.Value.fromAddress(_rejectedBy)
    )
  )

  return advRejectedEvent
}

export function createAdvRestartedEvent(
  _advId: Bytes,
  _restartedBy: Address
): AdvRestarted {
  let advRestartedEvent = changetype<AdvRestarted>(newMockEvent())

  advRestartedEvent.parameters = new Array()

  advRestartedEvent.parameters.push(
    new ethereum.EventParam("_advId", ethereum.Value.fromFixedBytes(_advId))
  )
  advRestartedEvent.parameters.push(
    new ethereum.EventParam(
      "_restartedBy",
      ethereum.Value.fromAddress(_restartedBy)
    )
  )

  return advRestartedEvent
}

export function createAdvSpaceCreatedEvent(
  _advSpaceId: Bytes,
  _size: Bytes,
  _pageURL: string
): AdvSpaceCreated {
  let advSpaceCreatedEvent = changetype<AdvSpaceCreated>(newMockEvent())

  advSpaceCreatedEvent.parameters = new Array()

  advSpaceCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_advSpaceId",
      ethereum.Value.fromFixedBytes(_advSpaceId)
    )
  )
  advSpaceCreatedEvent.parameters.push(
    new ethereum.EventParam("_size", ethereum.Value.fromFixedBytes(_size))
  )
  advSpaceCreatedEvent.parameters.push(
    new ethereum.EventParam("_pageURL", ethereum.Value.fromString(_pageURL))
  )

  return advSpaceCreatedEvent
}

export function createAdvSpaceStatusChangedEvent(
  _advSpaceId: Bytes,
  _isEnabled: boolean
): AdvSpaceStatusChanged {
  let advSpaceStatusChangedEvent = changetype<AdvSpaceStatusChanged>(
    newMockEvent()
  )

  advSpaceStatusChangedEvent.parameters = new Array()

  advSpaceStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_advSpaceId",
      ethereum.Value.fromFixedBytes(_advSpaceId)
    )
  )
  advSpaceStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_isEnabled",
      ethereum.Value.fromBoolean(_isEnabled)
    )
  )

  return advSpaceStatusChangedEvent
}

export function createAdvSpaceUpdatedEvent(
  _advSpaceId: Bytes
): AdvSpaceUpdated {
  let advSpaceUpdatedEvent = changetype<AdvSpaceUpdated>(newMockEvent())

  advSpaceUpdatedEvent.parameters = new Array()

  advSpaceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "_advSpaceId",
      ethereum.Value.fromFixedBytes(_advSpaceId)
    )
  )

  return advSpaceUpdatedEvent
}

export function createAdvStoppedEvent(
  _advId: Bytes,
  _stoppedBy: Address
): AdvStopped {
  let advStoppedEvent = changetype<AdvStopped>(newMockEvent())

  advStoppedEvent.parameters = new Array()

  advStoppedEvent.parameters.push(
    new ethereum.EventParam("_advId", ethereum.Value.fromFixedBytes(_advId))
  )
  advStoppedEvent.parameters.push(
    new ethereum.EventParam(
      "_stoppedBy",
      ethereum.Value.fromAddress(_stoppedBy)
    )
  )

  return advStoppedEvent
}

export function createAdvertiserWithdrawEvent(
  _advId: Bytes,
  _amount: BigInt
): AdvertiserWithdraw {
  let advertiserWithdrawEvent = changetype<AdvertiserWithdraw>(newMockEvent())

  advertiserWithdrawEvent.parameters = new Array()

  advertiserWithdrawEvent.parameters.push(
    new ethereum.EventParam("_advId", ethereum.Value.fromFixedBytes(_advId))
  )
  advertiserWithdrawEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return advertiserWithdrawEvent
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createModeratorAddedEvent(
  _modAddress: Array<Address>
): ModeratorAdded {
  let moderatorAddedEvent = changetype<ModeratorAdded>(newMockEvent())

  moderatorAddedEvent.parameters = new Array()

  moderatorAddedEvent.parameters.push(
    new ethereum.EventParam(
      "_modAddress",
      ethereum.Value.fromAddressArray(_modAddress)
    )
  )

  return moderatorAddedEvent
}

export function createModeratorRemovedEvent(
  _modAddress: Array<Address>
): ModeratorRemoved {
  let moderatorRemovedEvent = changetype<ModeratorRemoved>(newMockEvent())

  moderatorRemovedEvent.parameters = new Array()

  moderatorRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "_modAddress",
      ethereum.Value.fromAddressArray(_modAddress)
    )
  )

  return moderatorRemovedEvent
}

export function createPublisherWithdrawEvent(
  _advIds: Array<Bytes>,
  _amount: BigInt
): PublisherWithdraw {
  let publisherWithdrawEvent = changetype<PublisherWithdraw>(newMockEvent())

  publisherWithdrawEvent.parameters = new Array()

  publisherWithdrawEvent.parameters.push(
    new ethereum.EventParam(
      "_advIds",
      ethereum.Value.fromFixedBytesArray(_advIds)
    )
  )
  publisherWithdrawEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return publisherWithdrawEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createTokensDepositedEvent(
  _advId: Bytes,
  _amount: BigInt
): TokensDeposited {
  let tokensDepositedEvent = changetype<TokensDeposited>(newMockEvent())

  tokensDepositedEvent.parameters = new Array()

  tokensDepositedEvent.parameters.push(
    new ethereum.EventParam("_advId", ethereum.Value.fromFixedBytes(_advId))
  )
  tokensDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return tokensDepositedEvent
}
