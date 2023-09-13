import { AxiosClient } from ".";

export const getPatients = async (token) => {
  const { data } = await AxiosClient.get("/providers/patients", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createNewPatient = async ({ patientData, token }) => {
  const { data } = await AxiosClient.post("/patients", patientData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createNewInvite = async ({ id, token }) => {
  const { data } = await AxiosClient.post(
    "/invites",
    { patientId: id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getInvite = async ({ id, token }) => {
  const { data } = await AxiosClient.get(`/invites/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getPatientByUserId = async ({ id, accessToken }) => {
  const { data } = await AxiosClient.get(`/patients/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
