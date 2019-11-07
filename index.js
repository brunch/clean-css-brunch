
const CleanCSS = require( "clean-css" ) ;

class CleanCSSMinifier 
{
  constructor( config ) 
  {
    this.options = config && config.plugins && config.plugins.cleancss || {} ;
  }

  optimize( file ) 
  {
    const data = file.data ;
    const path = file.path ;

    try
    {
      if( this.options.ignored && this.options.ignored.test( path ) ) 
      {
        // ignored file path: return non minified
        return Promise.resolve(data);
      }
    } 
    catch( e ) 
    {
      return Promise.reject(`error checking ignored files to minify ${e}`);
    }

    try 
    {
      let prevMap = JSON.parse( file.map.toString() ) ; 
      let min     = new CleanCSS( this.options ).minify( data , prevMap ) ; 
      let currMap = JSON.parse( min.sourceMap.toString() ) ;
      let newMap  = Object.assign( prevMap , currMap ) ;
      let nFile   = 
      {
        data : min.styles ,
        map  : newMap ,
      };

      let stdinIdx = nFile.map.sources.indexOf( "$stdin" ) ;

      if( stdinIdx != -1 )
      {
        newMap.sourcesContent.splice( stdinIdx , 0 , "/* silence is golden */" ) ;
      }

      return Promise.resolve( nFile ) ;
    } 
    catch( error ) 
    {
      return Promise.reject(`CSS minify failed on ${path}: ${error}`);
    }
  }
}

CleanCSSMinifier.prototype.brunchPlugin = true ;
CleanCSSMinifier.prototype.extension = "css" ;
CleanCSSMinifier.prototype.type = "stylesheet" ;

module.exports = CleanCSSMinifier;
