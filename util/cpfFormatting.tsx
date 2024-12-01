export const CpfFormatting = (cpf: string): string => {
  let formattedCpf = cpf.replace(/\D/g, "");
  formattedCpf = formattedCpf.replace(/(\d{3})(\d)/, "$1.$2");
  formattedCpf = formattedCpf.replace(/(\d{3})(\d)/, "$1.$2");
  formattedCpf = formattedCpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return formattedCpf;
};

export const removeCpfFormatting = (cpf: string): string => {
  return cpf.replace(/\D/g, "");
};
