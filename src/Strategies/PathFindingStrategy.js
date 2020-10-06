function PathFindingStrategy() {
  const findPath = (algorithm, graph, src, dest, handlers) => {
    return algorithm.findPath(graph, src, dest, handlers);
  };
  return findPath;
}
export default PathFindingStrategy;
