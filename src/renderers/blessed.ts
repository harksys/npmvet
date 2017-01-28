import * as blessed from 'blessed';
import * as concat from 'lodash/concat';

/**
 * @param  {IPackageDescriptorMap} depMap
 */
export const render: IRenderer = (depMap) =>
{
  const screen = blessed.screen({
    smartCSR : true,
    title    : 'npmvet'
  });

  /*
   * Setup the table
   */
  const table = blessed.listtable({
    parent : screen,
    name   : 'npmvet table',

    tags : true,
    vi   : false,

    left   : 0,
    border : 'line',
    align  : 'center',
    width  : '100%',
    height : '100%',

    style : {
      header : {
        bg : 'blue'
      },
      cell   : {
        bg     : 'black',
        fg     : 'white',
        width  : '100%',
        height : '100%'
      }
    }
  });

  /*
   * Setup the table rows
   */
  let rows = [[
    'Name',
    'Package Version',
    'Installed Version',
    'Status',
    'Locked'
  ]];

  rows = concat(rows, createRows(depMap.deps), createRows(depMap.devDeps));

  /*
   * Set the table data, append the table to the screen
   * and focus on the table
   */
  table.setData(rows);
  screen.append(table);
  table.focus();

  /*
   * Allow for quitting on the screen, and then render!
   */
  screen.key(['escape', 'q', 'C-c'], (ch, key) => process.exit(0));
  screen.render();
};

/**
 * @param  {IPackageDescriptor[]} pkgDescriptor
 * @returns string
 */
function createRows(pkgDescriptor: IPackageDescriptor[]): string[][]
{
  return pkgDescriptor.map(pkg => ([
    pkg.name,
    pkg.definedVersion,
    pkg.installedVersion,
    (pkg.parsedDefinedVersion !== pkg.installedVersion
      ? '{red-bg} Mismatch {/red-bg}'
      : '{green-bg} Matching {/green-bg}'),
    (pkg.locked
      ? '{green-bg}  Locked  {/green-bg}'
      : '{red-bg} Unlocked {/red-bg}')
  ]));
};