module.exports = class Pix {
    ID_PAYLOAD_FORMAT_INDICATOR: string;
    ID_MERCHANT_ACCOUNT_INFORMATION: string;
    ID_MERCHANT_ACCOUNT_INFORMATION_GUI: string;
    ID_MERCHANT_ACCOUNT_INFORMATION_KEY: string;
    ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION: string;
    ID_MERCHANT_CATEGORY_CODE: string;
    ID_TRANSACTION_CURRENCY: string;
    ID_TRANSACTION_AMOUNT: string;
    ID_COUNTRY_CODE: string;
    ID_MERCHANT_NAME: string;
    ID_MERCHANT_CITY: string;
    ID_ADDITIONAL_DATA_FIELD_TEMPLATE: string;
    ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID: string;
    ID_CRC16: string;
    CRC16_LENGTH: string;

    private PIX_KEY: string;
    private DESCRIPTION_PAYLOAD: string;
    private MERCHANT_NAME: string;
    private MERCHANT_CITY: string;
    private TXID: string;
    private AMOUNT: string;

    constructor(pixKey: string, descriptionPayload: string, merchantName: string, merchantCity: string, txid: string, amount: number) {
        this.ID_PAYLOAD_FORMAT_INDICATOR = '00';
        this.ID_MERCHANT_ACCOUNT_INFORMATION = '26';
        this.ID_MERCHANT_ACCOUNT_INFORMATION_GUI = '00';
        this.ID_MERCHANT_ACCOUNT_INFORMATION_KEY = '01';
        this.ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION = '02';
        this.ID_MERCHANT_CATEGORY_CODE = '52';
        this.ID_TRANSACTION_CURRENCY = '53';
        this.ID_TRANSACTION_AMOUNT = '54';
        this.ID_COUNTRY_CODE = '58';
        this.ID_MERCHANT_NAME = '59';
        this.ID_MERCHANT_CITY = '60';
        this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE = '62';
        this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID = '05';
        this.ID_CRC16 = '63';
        this.CRC16_LENGTH = '04';

        this.PIX_KEY = pixKey;
        this.DESCRIPTION_PAYLOAD = descriptionPayload;
        this.MERCHANT_NAME = merchantName;
        this.MERCHANT_CITY = merchantCity;
        this.TXID = txid;
        this.AMOUNT = amount.toFixed(2);
    }

    private getValue(id: string, value: string): string {
        const size = value.length.toString().padStart(2, '0');
        return `${id}${size}${value}`;
    }

    private getMerchantAccountInformation(): string {
        const gui = this.getValue(this.ID_MERCHANT_ACCOUNT_INFORMATION_GUI, 'br.gov.bcb.pix');
        const key = this.getValue(this.ID_MERCHANT_ACCOUNT_INFORMATION_KEY, this.PIX_KEY);
        if (this.DESCRIPTION_PAYLOAD.length > 25){
            this.DESCRIPTION_PAYLOAD = this.DESCRIPTION_PAYLOAD.substring(0, 25);
        }
        const description = this.getValue(this.ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION, this.DESCRIPTION_PAYLOAD);
        return this.getValue(this.ID_MERCHANT_ACCOUNT_INFORMATION, `${gui}${key}${description}`);
    }

    private getAdditionalDataField(): string {
        const txid = this.getValue(this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID, this.TXID);
        return this.getValue(this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE, txid);
    }

    private getRedudancyCheck(payload: string): string {
        payload += this.ID_CRC16 + this.CRC16_LENGTH;

        let polinomio = 0x1021;
        let resultado = 0xFFFF;

        for (let i = 0; i < payload.length; i++) {
            resultado ^= (payload[i].charCodeAt(0) << 8);
            for (let j = 0; j < 8; j++) {
                if ((resultado <<= 1) & 0x10000) resultado ^= polinomio;
                resultado &= 0xFFFF;
            }
        }
        return `${this.ID_CRC16}${this.CRC16_LENGTH}${resultado.toString(16).padStart(4, '0').toUpperCase()}`;
    }

    getPayload(): string {
        const payload = this.getValue(this.ID_PAYLOAD_FORMAT_INDICATOR, "01") +
            this.getMerchantAccountInformation() +
            this.getValue(this.ID_MERCHANT_CATEGORY_CODE, "0000") +
            this.getValue(this.ID_TRANSACTION_CURRENCY, "986") +
            this.getValue(this.ID_TRANSACTION_AMOUNT, this.AMOUNT) +
            this.getValue(this.ID_COUNTRY_CODE, "BR") +
            this.getValue(this.ID_MERCHANT_NAME, this.MERCHANT_NAME) +
            this.getValue(this.ID_MERCHANT_CITY, this.MERCHANT_CITY) +
            this.getAdditionalDataField()

        return `${payload}${this.getRedudancyCheck(payload)}`;
    }
}
