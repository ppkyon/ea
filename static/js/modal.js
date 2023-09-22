$( function() {
    modal_reload( 'add' );
    modal_reload( 'edit' );
    modal_reload( 'delete' );
});

function up_modal() {
    $( '.modal-backdrop' ).each( function( index, value ){
        if ( index == $( '.modal-backdrop' ).length - 1 ) {
            $( this ).css( 'z-index', '1060' );
        }
    });
}

function modal_reload( action ) {
    $( '#' + action + '_success_modal' ).on( 'hidden.bs.modal', function () {
        if ( $( '#reload_url' ).length ) {
            window.location.href = $( '#reload_url' ).val();
        } else {
            window.location.reload();
        }
    });
    $( '#' + action + '_success_modal .no-button' ).on( 'click', function () {
        if ( $( '#reload_url' ).length ) {
            window.location.href = $( '#reload_url' ).val();
        } else {
            window.location.reload();
        }
    });
    $( '#' + action + '_error_modal' ).on( 'hidden.bs.modal', function () {
        if ( $( '#reload_url' ).length ) {
            window.location.href = $( '#reload_url' ).val();
        } else {
            window.location.reload();
        }
    });
    $( '#' + action + '_error_modal .no-button' ).on( 'click', function () {
        if ( $( '#reload_url' ).length ) {
            window.location.href = $( '#reload_url' ).val();
        } else {
            window.location.reload();
        }
    });
}