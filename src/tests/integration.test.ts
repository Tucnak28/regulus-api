import { SolarApi } from '../api/solar/solarApi';
import { SolarRequestData, solarResponseSchema } from '../api/solar/solarSchemas';

describe('SolarApi', () => {
  it('should update successfully', async () => {
    const solarApi = new SolarApi();
    const currentResponse = await solarApi.fetch();
    const currentServcieEnabled = currentResponse.consumer2.serviceEnabled;
    const payload: SolarRequestData = {
      solarC2ServiceEnabled: !currentServcieEnabled,
    };

    const result = await solarApi.update(payload);

    expect(result).toBeDefined();
    expect(() => solarResponseSchema.parse(result)).not.toThrow();
    expect(result.consumer2.serviceEnabled).toBe(!currentServcieEnabled);
  });
});
