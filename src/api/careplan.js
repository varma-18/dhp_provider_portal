import { CarePlanClient } from ".";

export const createNewCarePlan = async (patientId, planData, token) => {
  const { data } = await CarePlanClient.post(
    `/organizations/1/patient/${patientId}/careplans`,
    planData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const getCareplanTemplates = async (token) => {
  const { data } = await CarePlanClient.get(
    "/organizations/1/careplans/templates",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const getCareplanTemplateItems = async (tempId, token) => {
  const { data } = await CarePlanClient.get(
    `/organizations/1/careplans/templates/${tempId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const getPatientCareplans = async (patientId, token) => {
  const { data } = await CarePlanClient.get(
    `/organizations/1/patient/${patientId}/careplans`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const getPatientCareplanItems = async (planId, token) => {
  const { data } = await CarePlanClient.get(
    `/organizations/1/careplans/${planId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const activateCareplan = async (planId, token) => {
  const { data } = await CarePlanClient.patch(
    `/organizations/1/careplans/${planId}/activate`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};
