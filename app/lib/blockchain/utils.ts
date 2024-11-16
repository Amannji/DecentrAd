import { ethers } from "ethers";
import { publisherFactoryABI, publisherABI } from './abi';
const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);

interface Domain {
  getPublisherContractsFromFactory: (ethAddress: string) => Promise<[string, string][]>;
  getAllAdvSpaceIds: (ethAddress: string, publisherContract: string) => Promise<string[]>;
  getBatchAdvSpaceDetails: (ethAddress: string, publisherContract: string, advSpaceIds: string[]) => Promise<any[]>;
  getAdvIdsOfAdvSpace: (ethAddress: string, publisherContract: string, advSpaceId: string) => Promise<string[]>;
  getAdsByIds: (ethAddress: string, publisherContract: string, advIds: string[]) => Promise<[any[], boolean[]]>;
  getAdvIds: (ethAddress: string, publisherContract: string, adSpaceId: string) => Promise<string[]>;
}

const domain: Domain = {
  getPublisherContractsFromFactory: async (ethAddress: string) => {
    // const provider = await provider.getprovider(ethAddress);
    if (!process.env.DECENTRAD_FACTORY_CONTRACT) {
        throw new Error('DECENTRAD_FACTORY_CONTRACT environment variable is not defined');
    }
    const contract = new ethers.Contract(process.env.DECENTRAD_FACTORY_CONTRACT, publisherFactoryABI, provider);
    const allPubClonesByAddress = await contract.getAllPubClonesByAddress(ethAddress);
    return allPubClonesByAddress;
  },

  getAllAdvSpaceIds: async (ethAddress: string, publisherContract: string) => {
    // const provider = await provider.getprovider(ethAddress);
    const contract = new ethers.Contract(publisherContract, publisherABI, provider);
    const allAdvSpaceIds = await contract.getAllAdvSpaceIds();
    return allAdvSpaceIds;
  },

  getBatchAdvSpaceDetails: async (ethAddress: string, publisherContract: string, advSpaceIds: string[]) => {
    // const provider = await provider.getprovider(ethAddress);
    const contract = new ethers.Contract(publisherContract, publisherABI, provider);
    // console.log(advSpaceIds);
    const normalizedAdvSpaceIds = Array.from(advSpaceIds);
    advSpaceIds = normalizedAdvSpaceIds;
    const advSpacesByIds = await contract.getAdvSpacesByIds(advSpaceIds);
    return advSpacesByIds;
  },

  getAdvIdsOfAdvSpace: async (ethAddress: string, publisherContract: string, advSpaceId: string) => {
    // const provider = await provider.getprovider(ethAddress);
    const contract = new ethers.Contract(publisherContract, publisherABI, provider);
    const advIdsOfAdvSpace = await contract.getAdvIdsOfAdvSpace(advSpaceId);
    return advIdsOfAdvSpace;
  },

  getAdsByIds: async (ethAddress: string, publisherContract: string, advIds: string[]) => {
    // const provider = await provider.getprovider(ethAddress);
    const contract = new ethers.Contract(publisherContract, publisherABI, provider);
    const adsByIds = await contract.getAdsByIds(advIds);
    return adsByIds;
  },

  getAdvIds: async (ethAddress: string, publisherContract: string, adSpaceId: string) => {
    // const provider = await provider.getprovider(ethAddress);
    const contract = new ethers.Contract(publisherContract, publisherABI, provider);
    const advIds = await contract.getAdvIdsOfAdvSpace(adSpaceId);
    return advIds;
  }
};


export default domain;