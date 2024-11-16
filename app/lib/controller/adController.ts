'use strict';
import { ethers } from "ethers";
import BigNumber from 'bignumber.js';
import * as blockchain from '../blockchain/utils';

interface Ad {
  advertiser: string;
  advLink: string; 
  advSpaceIds: string;
  advStatus: boolean;
  advText: string;
  advTitle: string;
  ipfsHashes: string[];
  paymentRatePerSec: number;
  adStatus: boolean;
  weight?: string;
}

interface AdSpace {
  size: string;
  pageURL: string;
  moderators: string[];
  description: string;
  isEnabled: boolean;
  adSpaceIds?: string;
}

interface ContractInfo {
  siteUrl: string;
  publisherContractAddress: string;
}

const getAds = async (
  ethAddress: string,
  publisherContractAddress: string, 
  adSpaceId: string,
  isActive?: boolean
): Promise<Ad[]> => {
  try {
    const advIds = await blockchain.default.getAdvIds(ethAddress, publisherContractAddress, adSpaceId);
    const ads = await blockchain.default.getAdsByIds(ethAddress, publisherContractAddress, advIds);
    const adToSend: Ad[] = [];
    let sumofPaymentRatePerSec = new BigNumber(0);
    const adDetails = [...ads[0]];
    const adStatus = ads[1];

    for(let i=0; i < adDetails.length; i++) {
      if(isActive) {
        if(adStatus[i]) {
          adToSend.push({
            advertiser: adDetails[i].advertiser,
            advLink: adDetails[i].advLink,
            advSpaceIds: adDetails[i].advSpaceId,
            advStatus: adDetails[i].advStatus,
            advText: adDetails[i].advText,
            advTitle: adDetails[i].advTitle,
            ipfsHashes: adDetails[i].ipfsHashes,
            paymentRatePerSec: parseInt(adDetails[i].paymentRatePerSec.toString()),
            adStatus: adStatus[i]
          });
          sumofPaymentRatePerSec = new BigNumber(adDetails[i].paymentRatePerSec.toString()).plus(sumofPaymentRatePerSec);
        }
      } else {
        adToSend.push({
          advertiser: adDetails[i].advertiser,
          advLink: adDetails[i].advLink,
          advSpaceIds: adDetails[i].advSpaceId,
          advStatus: adDetails[i].advStatus,
          advText: adDetails[i].advText,
          advTitle: adDetails[i].advTitle,
          ipfsHashes: adDetails[i].ipfsHashes,
          paymentRatePerSec: parseInt(adDetails[i].paymentRatePerSec.toString()),
          adStatus: adStatus[i]
        });
        sumofPaymentRatePerSec = new BigNumber(adDetails[i].paymentRatePerSec.toString()).plus(sumofPaymentRatePerSec);
      }
    }

    if(isActive) {
      for(let eachAd of adToSend) {
        const sumofPaymentRateParsed = new BigNumber(sumofPaymentRatePerSec);
        const eachAdPaymentRateParsed = new BigNumber(eachAd.paymentRatePerSec);
        eachAd.weight = sumofPaymentRateParsed.dividedBy(eachAdPaymentRateParsed).toFixed(2);
      }
    }
    return adToSend;
  } catch(err) {
    throw err;
  }
};

const getAdSpaces = async (
  ethAddress: string,
  publisherContractAddress: string
): Promise<AdSpace[]> => {
  try {
    const adSpaceIds = await blockchain.default.getAllAdvSpaceIds(ethAddress, publisherContractAddress);
    const adSpacesDetails = await blockchain.default.getBatchAdvSpaceDetails(ethAddress, publisherContractAddress, adSpaceIds);
    console.log(adSpacesDetails);
    const dataToSend: AdSpace[] = [];
    for(let eachData of adSpacesDetails) {
      dataToSend.push({
        size: ethers.decodeBytes32String(eachData.size),
        pageURL: eachData.pageURL,
        moderators: eachData.moderators,
        description: eachData.description,
        isEnabled: eachData.isEnabled
      });
    }
    for(let i = 0; i < adSpaceIds.length; i++) {
      dataToSend[i].adSpaceIds = adSpaceIds[i];
    }
    return dataToSend;
  } catch(err) {
    throw err;
  }
};

const getContractAddress = async (ethAddress: string): Promise<ContractInfo[]> => {
  try {
    const factoryContract = await blockchain.default.getPublisherContractsFromFactory(ethAddress);
    const dataToSend: ContractInfo[] = [];
    for(let eachFactoryContract of factoryContract) {
      dataToSend.push({
        siteUrl: eachFactoryContract[0],
        publisherContractAddress: eachFactoryContract[1]
      });
    }
    return dataToSend;
  } catch(err) {
    throw err;
  }
};

export { getAds, getAdSpaces, getContractAddress };