import api from "@/lib/axios";
import type {
  MockTestConfigResponse,
  StartMockTestPayload,
  StartMockTestResponse,
  GetMockTestResponse,
  SubmitMockTestPayload,
  SubmitMockTestResponse,
} from "@/models/mockTest";

const MOCK_TEST_BASE_URL = "/mock-tests";

export const mockTestApi = {
  /** GET /api/v1/mock-tests/config - Get current user skills and Elo ratings for the start screen */
  getConfig: () =>
    api.get<MockTestConfigResponse>(`${MOCK_TEST_BASE_URL}/config`),

  /** POST /api/v1/mock-tests/start - Start a new test with selected skills (or return IN_PROGRESS) */
  start: (payload: StartMockTestPayload) =>
    api.post<StartMockTestResponse>(`${MOCK_TEST_BASE_URL}/start`, payload),

  /** GET /api/v1/mock-tests/:testId - Fetch existing test state */
  get: (testId: string) =>
    api.get<GetMockTestResponse>(`${MOCK_TEST_BASE_URL}/${testId}`),

  /** POST /api/v1/mock-tests/:testId/submit - Submit answers & finish test */
  submit: (testId: string, payload: SubmitMockTestPayload) =>
    api.post<SubmitMockTestResponse>(
      `${MOCK_TEST_BASE_URL}/${testId}/submit`,
      payload,
    ),
};
