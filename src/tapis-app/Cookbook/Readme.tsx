import React from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";

type ReadmeLink = {
  gitUrl: string;
  gitRef: string;
  rawReadmeUrl: string;
};

type ReadmeViewerProps = {
  id: string | undefined;
  version: string | undefined;
  notes: object | undefined;
};

const ReadmeViewer = ({ id, version, notes }: ReadmeViewerProps) => {
  const { gitUrl, gitRef, rawReadmeUrl } = notes as ReadmeLink;
  const { data, isLoading, error } = useQuery(
    ["readme", gitUrl, gitRef, rawReadmeUrl],
    async () => {
      const response = await fetch(rawReadmeUrl);
      return response.text();
    }
  );
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No readme found</div>;

  return (
    <div style={{ maxWidth: "800px" }}>
      <ReactMarkdown>{data}</ReactMarkdown>;
    </div>
  );
};

export default ReadmeViewer;
