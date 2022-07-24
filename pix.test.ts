import Pix from "./Pix";
import { equal } from "assert"

  ; (async () => {
    {
      const pixData = {
        pixKey: "123e4567-e12b-12d1-a456-426655440000",
        descriptionPayload: "Teste",
        merchantName: "Fulano de Tal",
        merchantCity: "BRASILIA",
        txid: "123",
        amount: 5
      }
      const pix = new Pix(pixData);
      const value = pix.getPayload();
      const mockPix = "00020126670014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400000205Teste52040000530398654045.005802BR5913Fulano de Tal6008BRASILIA6207050312363040E95"
      equal(value, mockPix);
    }
  })


