/*
    FILTERS.JS - Last updated: 05.02.15
*/
//-----------------------------------------------------------------
// Variables
//-----------------------------------------------------------------

var $container;
var filters = {};

//-----------------------------------------------------------------
//
//-----------------------------------------------------------------



//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

$(function(){

  var qsRange;
  var qsRegex;

  $container = $('#container');

  var $filterDisplay = $('#filter-display');
  var comboFilter = getComboFilter( filters );

  //preLoadHashFilters();
  var hash = location.hash.slice(1),
      hashParts = hash.split('&search:'),
      hashFilters = [],
      hashSearch = hashParts[1] || '';

  hashParts[0]
    .split(',')
    .filter(function(item){return $.trim(item)!== '';})
    .forEach(function(item){
      var classes = $.trim(item).split('.').filter(function(item){
        return item!=='';
      });
    	classes.forEach(function(item){
      	if (hashFilters.indexOf(item)==-1){
          hashFilters.push(item);
        }
      });
  });

  if (hashSearch !== '' || hashFilters.length){
    $('#options').find(':checkbox').filter(function(index,item){
      return hashFilters.indexOf(item.value.slice(1)) > -1;
    }).prop('checked',true);
  }

  //-----------------------------------------------------------------
  // Isotope
  //-----------------------------------------------------------------

  $container.isotope({ filter: function(){
      var $this = $(this),
          comboResult = $this.is(comboFilter),
          itemNumber = parseFloat($this.find('.size').text()),
          // searchResult = qsRange ? (itemNumber> qsRange.min &&  itemNumber < qsRange.max): true;
          searchResult = qsRegex ? $(this).text().match( qsRegex ) : true;

      return (comboResult || comboFilter=='') && searchResult;
    } });

  //-----------------------------------------------------------------
  // Reset Filters
  //-----------------------------------------------------------------

  $("#reset-filters").click(function(){
      // $container.isotope({
      //     filter: '*'
      // });

      //$('#options')[0].reset();
      //$('.course-search')[0].reset();

      $('#options input').attr( 'checked', false ).change();
  });

  //-----------------------------------------------------------------
  // Target CHECKBOX
  //-----------------------------------------------------------------

  var $options = $('#options').on( 'change', function( jQEvent ) {
    var $checkbox = $( jQEvent.target );
    manageCheckbox( $checkbox );
    comboFilter = getComboFilter( filters );

    $container.isotope();
    setHashText(comboFilter,qsRange);
  });

  //-----------------------------------------------------------------
  // SEARCH
  //-----------------------------------------------------------------

  var $search = $('#search').keyup( debounce( function() {
    qsRegex = new RegExp( $search.val(), 'gi' );
    var val = $search.val();
        // isNumber = jQuery.isNumeric( val ),
        // percentageChange = 0.15;

    // if (isNumber){
    //   qsRange = {
    //     min: val*(1-percentageChange),
    //     max: val*(1+percentageChange),
    //     actual: val}
    // } else {
    //   qsRange = undefined;
    // }
    $container.isotope();
    setHashText(comboFilter,val);
  }) );

  $('.course-search').bind("keydown", function(e) {
     if (e.keyCode === 13) return false;
   });

  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  if (hashFilters.length){
    $options.find(':checked:not([value=""])').trigger('change');
  }
  if (hashSearch !== ''){
    $search.val(hashSearch).trigger('keyup');
  }

}); //--
//-----------------------------------------------------------------
// Set Hash Text
//-----------------------------------------------------------------

function setHashText( comboFilter, range){

  var hash = comboFilter;
    if (range){
      // hash += '&search:' + range.actual;
      hash += '&search:' + range;
    }
    location.hash = hash;
  $('#filter-display').text(hash);
}
//-----------------------------------------------------------------
// Get Combo Filter
//-----------------------------------------------------------------

function getComboFilter( filters ) {
  var i = 0;
  var comboFilters = [];
  var message = [];

  for ( var prop in filters ) {
    message.push( filters[ prop ].join(' ') );
    var filterGroup = filters[ prop ];
    // skip to next filter group if it doesn't have any values
    if ( !filterGroup.length ) {
      continue;
    }
    if ( i === 0 ) {
      // copy to new array
      comboFilters = filterGroup.slice(0);
    } else {
      var filterSelectors = [];
      // copy to fresh array
      var groupCombo = comboFilters.slice(0); // [ A, B ]
      // merge filter Groups
      for (var k=0, len3 = filterGroup.length; k < len3; k++) {
        for (var j=0, len2 = groupCombo.length; j < len2; j++) {
          filterSelectors.push( groupCombo[j] + filterGroup[k] ); // [ 1, 2 ]
        }

      }
      // apply filter selectors to combo filters for next group
      comboFilters = filterSelectors;
    }
    i++;
  }

  var comboFilter = comboFilters.join(', ');
  return comboFilter;
}

//-----------------------------------------------------------------
// Manage Checkbox
//-----------------------------------------------------------------

function manageCheckbox( $checkbox ) {
  var checkbox = $checkbox[0];

  var group = $checkbox.parents('.option-set').attr('data-group');
  // create array for filter group, if not there yet
  var filterGroup = filters[ group ];
  if ( !filterGroup ) {
    filterGroup = filters[ group ] = [];
  }

  var isAll = $checkbox.hasClass('all');
  // reset filter group if the all box was checked
  if ( isAll ) {
    delete filters[ group ];
    if ( !checkbox.checked ) {
      checkbox.checked = 'checked';
    }
  }
  // index of
  var index = $.inArray( checkbox.value, filterGroup );
  if ( checkbox.checked ) {
      var selector = isAll ? 'input:checkbox' : 'input:checkbox.all';
      $checkbox.parent().siblings().find(selector).removeAttr('checked');
      if ( !isAll && index === -1 ) {
        // add filter to group
        filters[ group ].push( checkbox.value );
      }
    } else if ( !isAll ) {
      // remove filter from group
      filters[ group ].splice( index, 1 );
      // if unchecked the last box, check the all
      // debugger;
      var ancestor = $checkbox.parent().parent();
      var myArray = $(ancestor[0]).find('label>input:checked');
      var mylength = $(myArray).length;
      if ( mylength <= 0 ) {
        console.log('unchecking all');
      $checkbox.parent().parent().find('label>input:checkbox.all').prop('checked', 'checked');
      }
      else {
        console.log("keeping all checked");
      }
    }

  // if ( checkbox.checked ) {
  //   var selector = isAll ? 'input' : 'input.all';

  //   // REMOVE ALL SURROUNDING CHECKS
  //   $checkbox.siblings( selector ).removeAttr('checked');

  //   if ( !isAll && index === -1 ) {
  //     // add filter to group
  //     filters[ group ].push( checkbox.value );
  //   }

  // } else if ( !isAll ) {
  //   // remove filter from group
  //   filters[ group ].splice( index, 1 );

  //   // IF NO CHECKBOXS ARE CHECKED (APART FROM SELF)
  //   if ( !$checkbox.siblings('[checked]').length ) {
  //     // CHECK THE ALL
  //     $checkbox.siblings('input.all').attr('checked', 'checked');
  //   }
  // }

}
//-----------------------------------------------------------------
// debounce so filtering doesn't happen every millisecond
//-----------------------------------------------------------------

function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    setTimeout( delayed, threshold || 100 );
  };
}

//==================================================
//
//==================================================
