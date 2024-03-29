//1
export const validateBankName = new RegExp(/^(Santander)$/gi);

//2
export const validateBranchName = new RegExp(/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/);

//3
// export const validateBranchNumber = new RegExp(/^([0-9]{4})$/gm);
export const validateBranchNumber = new RegExp(/^([0-9]{7})$/gm);

//4
export const validateIp = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi);

//5
export const validatePort = new RegExp(/^([0-9]{1,5})$/gm);

//6
export const validateNetworkMask = new RegExp(/^((255)\.[0-5]{3}\.[0-5]{3}\.[0-5]+)$/gm);

//7
export const validateDnsAdress = new RegExp(/(^[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3})$/gi);

//8
export const validateGateway = new RegExp(/(^[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3})$/gi);

//9
export const validateIpFixoDhcp = new RegExp(/^([0-1]){1}$/g);

//10
export const validateMacAdress = new RegExp(/^([A-Z0-9]{2}\.[A-Z0-9]{2}\.[A-Z0-9]{2}\.[A-Z0-9]{2}\.[A-Z0-9]{2}\.[A-Z0-9]{2})$/gm);

//11
export const validateHour = new RegExp(/^(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]$/gm);

//12
export const validateReconPort = new RegExp(/^([1-4])$/gm)

//13
export const validateEmployee = new RegExp(/^([0-9]{1,6})$/gm)