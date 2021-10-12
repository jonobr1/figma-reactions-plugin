figma.showUI(__html__);

const frames = figma.currentPage.children.filter(getFrame).map(pruneFrame);
figma.ui.postMessage({ type: 'frames', data: frames });

figma.ui.onmessage = function(message) {

  switch (message.type) {

    case 'update':
      updateFrameTallies(message);
      break;

    case 'reset':
      resetFrameTallies();
      break;

    case 'cancel':
      figma.closePlugin();
      break;

  }

}

function updateFrameTallies({ id, tally }) {
  const frame = getFrameById(id);
  if (frame !== null) {
    figma.viewport.scrollAndZoomIntoView([frame]);
    frame.setPluginData('tally', JSON.stringify(tally));
  }
}

function resetFrameTallies() {
  const frames = figma.currentPage.children.filter(getFrame);
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    frame.setPluginData('tally', '');
  }
}

function getFrameById(id) {
  const frames = figma.currentPage.children.filter(getFrame);
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    if (frame.id === id) {
      return frame;
    }
  }
  return null;
}

function getFrame(node) {
  return node.type === 'FRAME' ? node : null;
}

function pruneFrame(frame, i) {
  let tally = frame.getPluginData('tally');
  if (tally) {
    tally = JSON.parse(tally);
  }
  return {
    id: frame.id,
    name: frame.name,
    tally
  };
}
