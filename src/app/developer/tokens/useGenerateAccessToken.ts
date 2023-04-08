"use client";

const useGenerateAccessToken = ({
  onFailure,
}: {
  onSuccess(): void;
  onFailure(): void;
}) => {
  return () => {
    onFailure();
  };
};

export default useGenerateAccessToken;
