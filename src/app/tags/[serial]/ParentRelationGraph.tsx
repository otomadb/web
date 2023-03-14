"use client";

import "client-only";

import clsx from "clsx";
import { useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  NodeTypes,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";

import { CommonTag } from "~/components/common/Tag";
import { FragmentType, getFragment, graphql } from "~/gql";

const RootFragment = graphql(`
  fragment TagPageLayout_ParentRelationGraph_Root on Tag {
    ...Link_Tag
    ...CommonTag
    id
  }
`);
export const Root: React.FC<{
  data: {
    fragment: FragmentType<typeof RootFragment>;
    hasParent: boolean;
    hasChild: boolean;
  };
}> = ({ data }) => {
  const fragment = getFragment(RootFragment, data.fragment);
  return (
    <>
      {data.hasParent && <Handle type="source" position={Position.Left} />}
      {data.hasChild && <Handle type="source" position={Position.Right} />}
      <div>
        <CommonTag fragment={fragment} />
      </div>
    </>
  );
};

const ParentFragment = graphql(`
  fragment TagPageLayout_ParentRelationGraph_Parent on Tag {
    ...Link_Tag
    ...CommonTag
    id
  }
`);
export const Parent: React.FC<{
  data: { fragment: FragmentType<typeof ParentFragment> };
}> = ({ data }) => {
  const fragment = getFragment(ParentFragment, data.fragment);
  return (
    <>
      <Handle type="target" position={Position.Right} />
      <div>
        <CommonTag fragment={fragment} />
      </div>
    </>
  );
};

const ChildFragment = graphql(`
  fragment TagPageLayout_ParentRelationGraph_Child on Tag {
    ...Link_Tag
    ...CommonTag
    id
  }
`);
export const Child: React.FC<{
  data: { fragment: FragmentType<typeof ChildFragment> };
}> = ({ data }) => {
  const fragment = getFragment(ChildFragment, data.fragment);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div>
        <CommonTag fragment={fragment} />
      </div>
    </>
  );
};

export const Fragment = graphql(`
  fragment TagPageLayout_ParentRelationGraph on Tag {
    ...TagPageLayout_ParentRelationGraph_Root
    id
    parents {
      nodes {
        id
        parent {
          ...TagPageLayout_ParentRelationGraph_Parent
          id
        }
      }
    }
    children {
      nodes {
        id
        child {
          ...TagPageLayout_ParentRelationGraph_Child
          id
        }
      }
    }
  }
`);
export const ParentRelationGraph: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = getFragment(Fragment, props.fragment);

  const nodeTypes: NodeTypes = useMemo(
    () => ({ root: Root, parent: Parent, child: Child }),
    []
  );
  const [nodes] = useNodesState([
    {
      id: `n-${fragment.id}`,
      type: "root",
      position: { x: 0, y: 0 },
      data: {
        fragment,
        hasParent: 0 < fragment.parents.nodes.length,
        hasChild: 0 < fragment.children.nodes.length,
      },
    },
    ...fragment.parents.nodes.map(({ parent }, i) => ({
      id: `n-${parent.id}`,
      type: "parent",
      position: { x: -150, y: i * 50 },
      data: { fragment: parent },
    })),
    ...fragment.children.nodes.map(({ child }, i) => ({
      id: `n-${child.id}`,
      type: "child",
      position: { x: 150, y: i * 50 },
      data: { fragment: child },
    })),
  ]);
  const [edges] = useEdgesState([
    ...fragment.parents.nodes.map(({ parent }) => ({
      id: `e-${fragment.id}-${parent.id}`,
      source: `n-${fragment.id}`,
      target: `n-${parent.id}`,
    })),
    ...fragment.children.nodes.map(({ child }) => ({
      id: `e-${fragment.id}-${child.id}`,
      source: `n-${fragment.id}`,
      target: `n-${child.id}`,
    })),
  ]);

  return (
    <div className={clsx(className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView={true}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
